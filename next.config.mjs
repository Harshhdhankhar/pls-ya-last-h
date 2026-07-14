/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/collections",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/collections/:slug",
        destination: "/shop?collection=:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
