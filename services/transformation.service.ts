import { ITransformationUpload } from "@/interfaces/root.interface";
import { api } from "@/lib/api/api";


export const transformationApi = api.injectEndpoints({
    endpoints: (build) => ({
        createTransformation: build.mutation({
            query: (data: ITransformationUpload) => ({
                url: '/transformation/create',
                method: 'POST',
                body: data
            })
        }),
        getTransformationsByUserId: build.query({
            query: (userId: string) => ({
                url: `/transformation/id/${userId}`,
                method: 'GET'
            }),
        }),
        getTransformationById: build.query({
            query: (id: string) => ({
                url: `/transformation/${id}`,
                method: 'GET'
            }),
        }),

        getLikedByUserTransformations: build.query({
            query: (userId: string) => ({
                url: `/transformation/liked/${userId}`,
                method: 'GET'
            }),
        }),
        getTransformationsByFilter: build.query({
            query: (params: Record<string, string>) => ({
                url: '/transformation/filter/search',
                method: 'GET',
                params
            }),
        }),
        getTransformationByText: build.query({
            query: (text: string) => ({
                url: `/transformation/search/text`,
                method: 'GET',
                params: { text }
            }),
        }),

        likeTransformation: build.mutation({
            query: (data: { userId: string, transformationId: string }) => ({
                url: '/transformation/like',
                method: 'PUT',
                body: data
            }),
        }),

        shareTransformation: build.mutation({
            query: (data: { userId: string, transformationId: string }) => ({
                url: '/transformation/share',
                method: 'PUT',
                body: data
            }),
        }),





    }),

});


export const {
    useCreateTransformationMutation,
    useGetTransformationsByUserIdQuery,
    useGetTransformationByIdQuery,
    useGetLikedByUserTransformationsQuery,
    useGetTransformationsByFilterQuery,
    useGetTransformationByTextQuery,
    useLikeTransformationMutation,
    useShareTransformationMutation
} = transformationApi;