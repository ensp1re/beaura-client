import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "menshaircuts.com",
      "via.placeholder.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "unsplash.com",
      "storage.googleapis.com",
      "media.thefashionisto.com",
      "lh3.googleusercontent.com",
      "i.pinimg.com",
      "res.cloudinary.com",
      "cdn.shopify.com", // Added domain
      "avatars.githubusercontent.com", // Added domain
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
