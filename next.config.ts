import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Включает генерацию папки out вместо .next
  // trailingSlash: true, // Рекомендуется для некоторых хостингов (сделает папки вместо .html файлов)
};

export default nextConfig;
