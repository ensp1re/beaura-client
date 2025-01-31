import { api } from "@/lib/api/api";




export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUserById: build.query({
            query: (id: string) => ({
                url: `users/id/${id}`,
                method: 'GET',
            }),
        }),
        getUserByUsername: build.query({
            query: (username: string) => ({
                url: `users/username/${username}`,
                method: 'GET',
            }),
        }),
        getUserByEmail: build.query({
            query: (email: string) => ({
                url: `users/email`,
                method: 'GET',
                body: { email },
            }),
        }),
    }),
});


export const { useGetUserByIdQuery, useGetUserByUsernameQuery, useGetUserByEmailQuery } = usersApi;