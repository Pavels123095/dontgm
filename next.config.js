/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Отключаем API роуты для статической сборки
  rewrites: async () => {
    return []
  },
}

module.exports = nextConfig 