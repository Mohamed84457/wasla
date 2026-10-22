import { createSlice } from "@reduxjs/toolkit";

const intialState: {
  name: string | null;
  email: string | null;
  profileImage: string | null;
} = {
  name: null,
  email: null,
  profileImage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    login: (_currentState, action) => {
      return action.payload;
    },
  },
});



export default authSlice.reducer;
export const {login}=authSlice.actions
