import { IAuthRedux } from "@/interfaces/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDataFromLocalStorage, saveToLocalStorage } from "../utils";


interface AuthState {
    user: IAuthRedux | null,
    accessToken: string | null,
    refreshToken: string | null
}

const initialState: AuthState = {
    user: null,
    accessToken: getDataFromLocalStorage("accessToken") ?? null,
    refreshToken: getDataFromLocalStorage('refreshToken') ?? null,
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<{
            user: IAuthRedux, accessToken: string, refreshToken: string,
        }>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            saveToLocalStorage('accessToken', action.payload.accessToken);
            saveToLocalStorage('refreshToken', action.payload.refreshToken);
        },
        updateTokens: (state, action: PayloadAction<{
            accessToken: string, refreshToken: string,
        }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            saveToLocalStorage('accessToken', action.payload.accessToken);
            saveToLocalStorage('refreshToken', action.payload.refreshToken);
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('refreshToken');
        },
        updateUser: (state, action: PayloadAction<IAuthRedux>) => {
            state.user = action.payload;
        },
    },
});

export const { login, logout, updateTokens, updateUser } = authSlice.actions;

export default authSlice.reducer;