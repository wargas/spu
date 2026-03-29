import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  adapterPath: require.resolve('./adapter.js'),
  output: 'standalone',
  // generateBuildId() {
  //       return process.env.GIT_HASH!
  // },

  /* config options here */
};

export default nextConfig;
