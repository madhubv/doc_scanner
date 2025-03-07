import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

// Try to import user config dynamically
let userConfig = {};
const userConfigPath = path.resolve(__dirname, './doc-scanner-user-next.config.js');

if (fs.existsSync(userConfigPath)) {
  const { default: importedConfig } = await import(userConfigPath);
  userConfig = importedConfig;
}

// Merge user config if found
mergeConfig(nextConfig, userConfig);

function mergeConfig(baseConfig, customConfig) {
  for (const key in customConfig) {
    if (typeof baseConfig[key] === 'object' && !Array.isArray(baseConfig[key])) {
      baseConfig[key] = { ...baseConfig[key], ...customConfig[key] };
    } else {
      baseConfig[key] = customConfig[key];
    }
  }
}

export default nextConfig;
