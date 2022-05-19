/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ROOT:
      process.env.NODE_ENV === "production"
        ? `https://wordle-clone-nlxacylhp-cathalmeagher10.vercel.app/`
        : `http://localhost:3000`,
  },
};

module.exports = nextConfig;
