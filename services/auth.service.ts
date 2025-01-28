import { api } from "@/lib/api/api";
import { ISignUpPostData, ResetPasswordFormProps } from "@/interfaces/auth.interface"


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
                    url: '/auth/login',
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
        }),
        forgotPasswordSendEmail: build.mutation({
            query: (email: string) => ({
                url: '/auth/forgot-password',
                method: 'PUT',
                body: { email }
            })
        }),
        resetPassword: build.mutation({
            query: ({ data, token }: { data: ResetPasswordFormProps, token: string }) => ({
                url: '/auth/reset-password?token=' + token,
                method: 'PUT',
                body: {
                    password: data.password,
                    confirmPassword: data.confirmPassword
                }
            })
        }),
    })
})


export const {
    useSignUpMutation,
    useLoginMutation,
    useGoogleLoginMutation,
    useCheckAuthenticationQuery,
    useForgotPasswordSendEmailMutation,
    useResetPasswordMutation,
} = authApi;
export default authApi;
