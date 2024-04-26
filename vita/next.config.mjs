/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'oaidalleapiprodscus.blob.core.windows.net',
              port: '',
            },
          ],
    },
    reactStrictMode: false
};

export default nextConfig;
