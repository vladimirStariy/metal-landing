import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true }, // static export: оптимизатор изображений недоступен
  output: 'export', // Включает генерацию папки out вместо .next
  // trailingSlash: true, // Рекомендуется для некоторых хостингов (сделает папки вместо .html файлов)
};

export default nextConfig;
