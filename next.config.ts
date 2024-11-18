import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpileDependencies: true, 
  publicPath: process.env.NODE_ENV === 'production'
    ? '/SierraMa1/' //nombre de tu proyecto GitHub
    : '/'
};

export default nextConfig;
