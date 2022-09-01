/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors },
  swcMinify: true,
  images: {
    domains: ["pps.whatsapp.net", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
