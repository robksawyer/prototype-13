/**
 * next.config.js
 * Next JS configuration file
 * The following helps to use multiple plugins
 * @see https://github.com/JerryCauser/next-compose
 */
/**
 * Web Workers
 * @see https://github.com/zeit/next-plugins/tree/master/packages/next-workers
 * Use SASS styles
 * @see https://github.com/zeit/next-plugins/tree/master/packages/next-sass
 * Using Fonts
 * @see https://github.com/rohanray/next-fonts
 * Environment variables
 * @see https://stackoverflow.com/questions/50416138/nextjs-set-dynamic-environment-variables-at-the-start-of-the-application
 */

/**
 * Exclude tests and stories from being compiled.
 * @see https://github.com/zeit/next.js/issues/1914
 * via
 * excludeFile: ... (see below)
 */
const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withTM = require('next-transpile-modules')([
  '@react-three',
  'postprocessing',
  'three',
  'gsap',
])
// const withSass = require('@zeit/next-sass')
// const withCSS = require('@zeit/next-css')
// const withWorkers = require('@zeit/next-workers')
const path = require('path')

// console.log('process.env.NODE_ENV', process.env.NODE_ENV)

// const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
// const port = process.env.NODE_ENV === 'production' ? 8081 : 3000
// console.log('Client API is running on port', port, 'and protocol', protocol)

const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  distDir: 'build',
  // serverRuntimeConfig: { // Will only be available on the server side
  //   wordpressApiUrl: process.env.WORDPRESS_API_URL
  // },
  // publicRuntimeConfig: { // Will be available on both server and client
  //   staticFolder: '/public',
  //   port: 8081 // The server port
  // },
  // pageExtensions: ['jsx', 'js'],
  // Removes the [BABEL] Note: The code generator has deoptimised the styling of
  compact: true,
  webpack: (config, options) => {
    // Unshift polyfills in main entrypoint.
    // @see https://stackoverflow.com/questions/53304140/transpiling-nextjs-for-ie-10-11-weakset-undefined
    // const originalEntry = config.entry
    // config.entry = async () => {
    //   const entries = await originalEntry()
    //   if (entries['main.js']) {
    //     entries['main.js'].unshift('./polyfills.js') // <- polyfill here
    //   }
    //   return entries
    // }
    const { dev } = options
    if (dev) {
      config.module.rules.push(
        {
          test: /\.(spec,test,stories)\.(js|jsx)$/,
          loader: 'ignore-loader',
        },
        {
          test: /\.{js,jsx}$/,
          enforce: 'pre',
          include: [path.resolve('components'), path.resolve('pages')],
          exclude: ['/node_modules/', '/_next/', '/build/', '/.next/', '/out/'],
          options: {
            // Compile, but with a warning
            emitWarning: true,
          },
          loader: 'eslint-loader',
        }
      )

      // Load GLSL Shaders
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      })
    }
    return config
  },
  env: {},
}

module.exports = withPlugins(
  [
    [withTM, {}],
    [withFonts, {}],
  ],
  nextConfig
)
