/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/arweave/tx/:hash*',
        destination: '/arweave/:hash*',
        permanent: true,
      },
    ]
  },
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     '/about': { page: '/about' },
  //     '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
  //     '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
  //     '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
  //   }
  // },
}
