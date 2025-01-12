import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "menshaircuts.com",
      "via.placeholder.com",
      "storage.googleapis.com",
      "media.thefashionisto.com",
      "i.pinimg.com",
      "cdn.shopify.com", // Added domain
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
