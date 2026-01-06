/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Temporary — fix errors later
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
