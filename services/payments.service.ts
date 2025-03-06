import { api } from "@/lib/api/api";

const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({ userId, planType }: { userId: string; planType: string }) => ({
        url: `payments/create-checkout-session/${userId}`,
        method: "POST",
        body: { planType },
      }),
    }),
    createPortalSession: builder.mutation({
      query: (userId: string) => ({
        url: `payments/create-portal-session/${userId}`,
        method: "POST",
      }),
    }),
    cancelSubscription: builder.mutation({
      query: (userId: string) => ({
        url: `payments/cancel-subscription/${userId}`,
        method: "POST",
      }),
    }),
    handleWebhook: builder.mutation({
      query: ({ signature, body }) => ({
        url: "payments/webhook",
        method: "POST",
        headers: {
          "stripe-signature": signature,
        },
        body,
      }),
    }),
    retrieveInvoice: builder.query({
      query: (invoiceId: string) => ({
        url: `payments/retrieve-invoice/${invoiceId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useCreatePortalSessionMutation,
  useCancelSubscriptionMutation,
  useHandleWebhookMutation,
  useRetrieveInvoiceQuery,
} = paymentsApi;

export default paymentsApi;
