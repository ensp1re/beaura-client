/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./reducers/uiSlice";
import authReducer from "./reducers/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./api/api";



export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
