/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        runtime: process.env.RUNTIME
    }
};

export default nextConfig;
