/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    // NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    REACT_APP_BASE_URL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
  },
};
