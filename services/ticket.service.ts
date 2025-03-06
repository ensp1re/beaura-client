import {
  ICreateMessageDto,
  ICreateTicketDto,
  TicketStatus,
} from "@/interfaces/ticket.interface";
import { api } from "@/lib/api/api";

export const ticketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (ticket: ICreateTicketDto) => ({
        url: "/tickets",
        method: "POST",
        body: ticket,
      }),
    }),
    getTickets: builder.query({
      query: (status: TicketStatus) => ({
        url: "/tickets",
        params: { status },
      }),
    }),
    getTicketDetails: builder.query({
      query: (id: string) => ({
        url: `/tickets/${id}`,
      }),
    }),
    updateTicketStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: TicketStatus }) => ({
        url: `/tickets/${id}/status`,
        method: "PUT",
        body: { status },
      }),
    }),
    addMessage: builder.mutation({
      query: ({ id, message }: { id: string; message: ICreateMessageDto }) => ({
        url: `/tickets/${id}/messages`,
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketDetailsQuery,
  useUpdateTicketStatusMutation,
  useAddMessageMutation,
} = ticketApi;
