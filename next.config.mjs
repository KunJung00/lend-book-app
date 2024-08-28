/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        runtime: process.env.RUNTIME
    },
    eslint:{
        ignoreDuringBuilds:true,
    }
};

export default nextConfig;
