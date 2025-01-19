import { api } from "@/lib/api/api";
import { ISignUpPostData } from "@/interfaces/auth.interface"


export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation({
            query(body: ISignUpPostData) {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body
                }
            }
        }),
        login: build.mutation({
            query(body) {
                return {
                    url: '/auth/signin',
                    method: 'POST',
                    body,
                }
            }
        }),
        googleLogin: build.mutation({
            query: (idToken: string) => ({
                url: '/auth/google-login',
                method: 'POST',
                body: { idToken },
            }),
        }),
        refreshToken: build.mutation({
            query: (username: string) => ({
                url: `/auth/refresh-token/${username}`,
                method: 'POST',
            })
        }),
        checkAuthentication: build.query({
            query: () => ({
                url: '/auth/authenticated',
                method: "GET",
                credentials: 'include',
            })
        })
    })
})


export const {
    useSignUpMutation,
    useLoginMutation,
    useGoogleLoginMutation,
    useCheckAuthenticationQuery,
} = authApi;
export default authApi;
