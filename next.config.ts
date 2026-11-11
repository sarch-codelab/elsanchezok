import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/elsanchezok",
  trailingSlash: true,
  reactStrictMode: true,
  // El preview se abre en 127.0.0.1 y el servidor de desarrollo lo trataba
  // como origen ajeno, así que el socket de recarga en vivo se rechazaba.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
