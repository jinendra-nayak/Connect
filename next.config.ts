import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Dev only: lets you open the site from another device on your network
  // (e.g. a phone) with live reload. Update if your LAN IP changes.
  allowedDevOrigins: ["10.136.150.198"],
  turbopack: {
    // Pin the project root so a stray lockfile in ~ is not picked up.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
