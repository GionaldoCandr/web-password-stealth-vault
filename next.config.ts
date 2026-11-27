import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error Next.js agent upgrade flag
    agentUpgrade: "security",
  },
};

export default nextConfig;
