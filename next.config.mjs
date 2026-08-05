/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "blog.logrocket.com",
      },
      {
        protocol: "https",
        hostname: "serverpilot.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/services/automation/:path*",
        destination: "/services/ai-automation/:path*",
      },
      {
        source: "/services/customer-exp-management/:path*",
        destination: "/services/customer-experience-management/:path*",
      },
      {
        source: "/services/software-development/it-consulting-services",
        destination: "/services/software-development/tech-advisory-services",
      },
      {
        source: "/services/software-development/it-consulting-services/:path*",
        destination: "/services/software-development/tech-advisory-services/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/audit/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
