/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.weatherapi.com",
        port: "",
        pathname: "/weather/64x64/day/**",
      },
    ],
  },
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
};

module.exports = nextConfig;
