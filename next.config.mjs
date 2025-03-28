/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "bookish-space-waddle-wr95r9qvq9p52g74r-3000.app.github.dev"
      ]
    },
    ppr: "incremental"
  },
};

export default nextConfig;
