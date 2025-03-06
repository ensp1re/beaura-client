import { IconType } from "react-icons";
import { IAuthRedux } from "./auth.interface";

export interface NavLink {
  title?: string;
  href?: string;
  icon: IconType;
}

export interface HaircutGalleryPrompt {
  id: number;
  type: string;
  itemToReplace: string;
  replaceWith: string;
  exampleImage: string;
  sex: string;
}

export interface IBenefitProps {
  title: string;
  isIncluded: boolean;
}

export interface IImageHome {
  id: number;
  src: string;
  user: string;
  likes: number;
  shares: number;
  height: number;
}

export interface IAspectRatioOption {
  aspectRatio: string;
  label: string;
  width: number;
  height: number;
}

export interface IImageGallery {
  id: number;
  src: string;
  user: string;
  likes: number;
  shares: number;
  height: number;
}

export interface ILikeTransformationPayload {
  transformationId: string;
  userId: IAuthRedux;
}

export interface IShareTransformationPayload {
  transformationId: string;
  userId: string;
}

export interface ITransformationData {
  _id?: string;
  userId: IAuthRedux;
  title?: string;
  prompt?: string;
  selectedImage?: ArrayBuffer | string | null;
  tags?: string[];
  transformationType?: string; // "GenerativeReplace" || "HaircutGallery" || "HaircutPrompt" || "3DModel" || "ImageToImage"
  aspectRatio?: IAspectRatioOption;
  isQuality?: boolean;
  isPublic?: boolean;
  fromImage?: string;
  toImage?: string;
  likes?: ILikeTransformationPayload[];
  shares?: IShareTransformationPayload[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Response {
  id: number;
  ticketId: number;
  user: string;
  message: string;
  timestamp: string;
}

export interface Ticket {
  id: number;
  user: string;
  email: string;
  subject: string;
  status: string;
  lastUpdated: string;
}

export interface TicketDetailsProps {
  ticket: Ticket;
  responses: Response[];
}

export interface Subscription {
  id: number;
  name: string;
  price: number;
  features: string[];
}

export interface ProfileFormValues {
  username: string;
  name: string;
  bio: string;
  email: string;
  isPublic: boolean;
  showLikedTransformations: boolean;
}

export interface PublicProfile {
  name: string;
  username: string;
  bio: string;
  memberSince: string;
  transformations: number;
}

export interface ITransformationUpload {
  userId: string;
  title: string;
  prompt: string;
  tags: string[];
  selectedImage: ArrayBuffer | string | null;
  isPublic: boolean;
  aspectRatio: IAspectRatioOption;
  isQuality: boolean;
  transformationType: string;
}


export interface ISubscription {
  id?: string;
  status: string;
  planId: string;
  planName: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}