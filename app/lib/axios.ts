import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (baseURL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

 const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};
//add _retry to config
// {
//   url: "/services",
//   method: "get",
//   _retry: true (not exist by default)
// }

let refreshPromise: Promise<void> | null = null;//that ensure only one refresh token request if user try to send anther request
let onUnauthorized: (() => void) | null = null;//this extra function  i can send it to setUnauthorizedHandler . down here if refresh token not valid or expire it send error and call the function you send it , it opetional so it onUnauthorized?.() "."   , like 
//  setUnauthorizedHandler(() => {
//   dispatch(sessionExpired());
// });   
// this slice remove all user data we call it here 

 function setUnauthorizedHandler(
  handler: () => void,
) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,//if request success return it 

//   if request faild show if it anther error of 401 or related to token , so not make refresh token and return error
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryConfig
      | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? "";

    // Do not refresh recursively for these endpoints.
    const excludedEndpoints = [
      "/auth/login",
      "/auth/refresh",
      "/auth/logout",
    ];

    if (
      excludedEndpoints.some((endpoint) =>
        url.includes(endpoint)
      ) ||
      originalRequest._retry//check if it call once then do not call it again  
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;//this know the request call once and if it fail again after refresh that mean 
    // the refresh token expire or not valid

    try {
      // If several requests fail simultaneously, share
      // one refresh request instead of sending many.
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post("/auth/refresh")
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      // The browser now has the renewed cookie.
      // Retry this original request only once. 
      return api.request(originalRequest);
    } catch (refreshError) {
      onUnauthorized?.();
      return Promise.reject(refreshError);
    }
  },
);



export {setUnauthorizedHandler,api}