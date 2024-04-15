/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/GlobalDashboard', // Adjust the destination as needed
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
