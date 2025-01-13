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