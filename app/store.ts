import { configureStore } from "@reduxjs/toolkit";
// slices
import authReducer from "./features/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;