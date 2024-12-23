import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '**',
      },
    ],
  },
  eslint: {ignoreDuringBuilds:true},
  typescript: {ignoreBuildErrors:true},
  //output: 'standalone'
};

export default nextConfig;
