/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "127.0.0.1",
      process.env.NEXT_PUBLIC_API_URL?.replace("http://", "").replace("https://", "").split(":")[0],
    ].filter(Boolean),
  },
};

module.exports = nextConfig;
