/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'oaidalleapiprodscus.blob.core.windows.net',
              port: '',
            },
            {
              protocol: "https",
              hostname: "vita-juliomeza2510-mybucket-uvkhksmm.s3.us-east-1.amazonaws.com",
              port: ''
            }
          ],
    },
    reactStrictMode: false,
    experimental: {
      serverComponentsExternalPackages: [
        'puppeteer-core',
        '@sparticuz/chromium'
      ]
    }
};

export default nextConfig;
