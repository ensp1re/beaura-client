import { IBenefitProps, IImageHome, NavLink } from "@/interfaces/root.interface";
import { BiCreditCard } from "react-icons/bi";
import { FaHome, FaImage } from "react-icons/fa";
import { RxScissors } from "react-icons/rx";

export const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/home",
    icon: FaHome,
  },
  {
    title: "Change Haircut",
    href: "/transformation/haircut",
    icon: RxScissors,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: FaImage,
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


export const images: IImageHome[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1696800328730-ae42bc5b0e63?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Anna",
    likes: 123,
    shares: 45,
    height: 600,
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Sophia",
    likes: 98,
    shares: 30,
    height: 800,
  },
  {
    id: 3,
    src: "https://plus.unsplash.com/premium_photo-1679619554270-33b16a64ddbc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Emma",
    likes: 150,
    shares: 60,
    height: 720,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1726003517984-b88509e6d1b2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Olivia",
    likes: 200,
    shares: 80,
    height: 1080,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1479752524501-2a1efb81c407?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Isabella",
    likes: 134,
    shares: 50,
    height: 900,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
    user: "Mia",
    likes: 85,
    shares: 40,
    height: 768,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1478465726282-ddb11650c80b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Amelia",
    likes: 112,
    shares: 55,
    height: 850,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    user: "Charlotte",
    likes: 145,
    shares: 75,
    height: 700,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1724185078651-c6aeefa17300?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Harper",
    likes: 170,
    shares: 95,
    height: 820,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    user: "Evelyn",
    likes: 160,
    shares: 85,
    height: 750,
  },
];



export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const reviews = [
  {
    image: "/assets/ava1.jpg",
    username: "anna",
    nickname: "Anna",
    review: "I love this app! It's so easy to use and the results are amazing!",
  },
  {
    image: "/assets/ava2.jpg",
    username: "sophia",
    nickname: "Sophia",
    review: "Fantastic app! It has transformed my look completely. Highly recommend!",
  },
  {
    image: "/assets/ava3.jpg",
    username: "emma",
    nickname: "Emma",
    review: "Great experience! The transformations are very realistic and fun to try.",
  },
]

export const planCredits: {
  free: number,
  plus: number,
  premium: number,
} = {
  free: 5,
  plus: 25,
  premium: 100,
}

export const planCosts: {
  free: number,
  plus: number,
  premium: number,
} = {
  free: 0,
  plus: 5.99,
  premium: 14.99,
}