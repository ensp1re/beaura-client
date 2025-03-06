import { IAuthRedux } from "./auth.interface";

export enum TicketStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  CLOSED = "Closed",
}

export interface IMessage {
  userId: string;
  profilePicture: string;
  username: string;
  email: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicket {
  _id: string;
  subject: string;
  status: TicketStatus;
  userId: {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketDetails extends ITicket {
  user: IAuthRedux;
}

export interface ICreateTicketDto {
  email: string | undefined;
  userId?: string | undefined;
  subject: string | undefined;
  content: string | undefined;
}

export interface IUpdateTicketStatusDto {
  status: TicketStatus | undefined;
}

export interface ICreateMessageDto {
  userId: string | undefined;
  content: string | undefined;
}
