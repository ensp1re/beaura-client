import { IBenefitProps, NavLink } from "@/interfaces/root.interface";
import { BiCreditCard } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import { MdPhotoLibrary } from "react-icons/md";

export const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    title: "Change Haircut",
    href: "/transformation/haircut",
    icon: GiScissors,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: MdPhotoLibrary,
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: BiCreditCard,
  },
];

export const freePlanBenefits: IBenefitProps[] = [
  {
    title: "5 credit per month",
    isIncluded: true,
  },
  {
    title: "Basic hair transformations",
    isIncluded: true,
  },
  {
    title: "Standard resolution output",
    isIncluded: true,
  },
];

export const plusPlanBenefits: IBenefitProps[] = [
  {
    title: "25 credits per month",
    isIncluded: true,
  },
  {
    title: "Advanced transformations",
    isIncluded: true,
  },
  {
    title: "HD resolution output",
    isIncluded: true,
  },
];

export const premiumPlanBenefits: IBenefitProps[] = [
  {
    title: "100 credits per month",
    isIncluded: true,
  },
  {
    title: "Advanced hair transformations",
    isIncluded: true,
  },
  {
    title: "High-resolution output",
    isIncluded: true,
  },
  {
    title: "Priority support",
    isIncluded: true,
  },
];
