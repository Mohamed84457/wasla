"use client"

// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../store";

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();


// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../store";

// export const useAppDispatch: () => AppDispatch = useDispatch;

// export const useAppSelector: (
//   selector: (state: RootState) => RootState
// ) => RootState = useSelector;


import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;