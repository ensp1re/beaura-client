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
    }),
});


export const { useCreateTransformationMutation } = transformationApi;