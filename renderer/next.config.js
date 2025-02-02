/** @type {import('next').NextConfig} */
// module.exports = {
//   output: 'export',
//   distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
//   trailingSlash: true,
//   images: {
//     unoptimized: true,
//   },
//   webpack: (config) => {
//     return config
//   },
// }


// in `./renderer/next.config.js`
module.exports = {
  // we need to export static files so as Electron can handle them
  output: 'export',

  distDir:
    process.env.NODE_ENV === 'production'
      ? // we want to change `distDir` to "../app" so as nextron can build the app in production mode!
      '../app'
      : // default `distDir` value
      '.next',

  // e.g. home.html => home/index.html
  trailingSlash: true,

  // we need to disable image optimization, because it is not compatible with `{ output: 'export' }`
  images: {
    unoptimized: true,
  },

  // webpack config for next.js
  webpack: (config) => {
    return config
  },
}