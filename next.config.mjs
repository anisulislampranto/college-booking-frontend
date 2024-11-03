// Import next-pwa using ES module syntax
import withPWA from "next-pwa";

// Configure PWA
const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  sw: "service-worker.js",
});

// Define the Next.js configuration
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "college-booking-backend-production-d4ba.up.railway.app",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

// Export the configuration with PWA enabled
export default pwaConfig(nextConfig);
