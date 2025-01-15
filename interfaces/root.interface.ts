import { IconType } from "react-icons";

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

export interface ITransformationData {
  userId?: string;
  title: string;
  prompt: string;
  selectedImage: string;
  tags?: string[];
  transformationType?: string;
  aspectRatio?: string;
  isQuality?: boolean;

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

