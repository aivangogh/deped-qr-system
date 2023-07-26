/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // modularizeImports: {
  //   '@radix-ui/react-icons': {
  //     transform: '@radix-ui/react-icons/{{member}}',
  //   },
  // },
};

module.exports = nextConfig;
