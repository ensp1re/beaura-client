/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logout, updateTokens } from "../reducers/authSlice";
import { getDataFromSessionStorage } from "../utils";



import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.NEXT_API_URL || "http://localhost:4000";


const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args, api, extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error?.status === 401) {
        const loggedInUsername: string = getDataFromSessionStorage("loggedInUser");
        const refreshResult = await baseQuery(`/auth/refresh-token/${loggedInUsername}`, api, extraOptions);
        if (refreshResult.data) {
            api.dispatch(updateTokens({
                accessToken: (refreshResult.data as { accessToken: string; }).accessToken,
                refreshToken: (refreshResult.data as { refreshToken: string; }).refreshToken,
            }))
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
}

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
})