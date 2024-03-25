/** @type {import('next').NextConfig} */
const nextConfig = {
    sperimentale: {
        serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium']
    }
};

export default nextConfig;
