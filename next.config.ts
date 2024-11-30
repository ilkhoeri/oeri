import { withContentlayer } from "next-contentlayer2";
import nextPWA from "next-pwa";
import type { NextConfig } from "next";

/** @type {import('next-pwa').PWAConfig} */
const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: ["app-build-manifest.json"]
});

const config: NextConfig = withContentlayer({
  // cleanDistDir: true,
  // output: "export", // must be exported function "generateStaticParams()", which is required with "output: export" config
  // poweredByHeader: false,
  // swcMinify: true,
  experimental: {},
  reactStrictMode: true,
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      {
        source: "/native/:slug",
        destination: "/mobile/:slug",
        permanent: true
      },
      {
        source: "/docs/examples",
        destination: "/examples/playground",
        permanent: true
      },
      {
        source: "/examples",
        destination: "/examples/playground",
        permanent: true
      }
    ];
  },
  images: {
    deviceSizes: [375, 640, 768, 1024, 1536, 1920],
    minimumCacheTTL: 60 * 60 * 24,
    formats: ["image/avif", "image/webp"],
    domains: [
      "api.microlink.io",
      "img.clerk.com",
      "lh3.googleusercontent.com",
      "cdn-icons-png.flaticon.com",
      "images.unsplash.com",
      "plus.unsplash.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "contrib.rocks",
        pathname: "/**"
      }
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          child_process: false,
          worker_threads: false,
          "builtin-modules": false
        }
      };
    }

    return config;
  }
});

// @ts-ignore
export default withPWA(config);
