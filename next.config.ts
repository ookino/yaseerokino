import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: { urlImports: ["https://themer.sanity.build/"] },
};

export default nextConfig;
