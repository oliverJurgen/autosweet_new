/** @type {import('next').NextConfig} */

const withVideos = require("next-videos");
const withTm = require("next-transpile-modules")(["react-hook-geolocation"]);

module.exports = withTm(
  withVideos({
    reactStrictMode: true,
    env: {
      // NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
      REACT_APP_BASE_URL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
    },
    images: {
      domains: ["lh3.googleusercontent.com"],
    },
    assetPrefix:
      "https://autosweet-conent.azureedge.net/assets",
  })
);
