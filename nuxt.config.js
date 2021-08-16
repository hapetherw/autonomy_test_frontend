import i18n from './config/i18n'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  publicRuntimeConfig: {
    SERVER_BASE_URL: process.env.SERVER_URL || 'http://127.0.0.1:3000',
    SOCKET_BASE_URL: process.env.SOCKET_URL || 'http://127.0.0.1:2053',
    IS_DEV: process.env.NODE_ENV || 'development'
  },
  mode: 'universal',
  server: {
    host: '0.0.0.0',
    port: 3002
  },
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  head: {
    title: 'Triangular Arbitrage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        // src: '/chat.js'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/filters',
    { src: '~/plugins/breakpoint.js', mode: 'client' },
    { src: '~/plugins/country-flag.js', mode: 'client' },
    { src: '~/plugins/vue-flux.js', mode: 'client' },
    { src: '~/plugins/vue-select.js' },
    { src: '~/plugins/infinite-loading.js' },
    { src: '~/plugins/v-calendar.js', mode: 'client' },
    { src: '~/plugins/spinner.js' },
    { src: '~/plugins/mq.js' },
    { src: '~/plugins/socket.io.js', mode: 'client' },
    { src: '~/plugins/qrcode.js', mode: 'client' },
    { src: '~/plugins/switch.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    'nuxt-clipboard2',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-i18n', {
      strategy: 'prefix_except_default',
      defaultLocale: 'en',
      locales: [
        {
          code: 'en',
          name: 'English',
          iso: 'en-US'
        },
        {
          code: 'es',
          name: 'Español',
          iso: 'es-ES'
        }
      ],
      vueI18n: i18n
    }],
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  styleResources: {
    scss: '~/assets/scss/_variables.scss'
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api': {
      target: process.env.SERVER_URL || 'http://127.0.0.1:3000'
      // target: 'http://192.168.8.118:3000'
    }
    // '/socket.io': {
    //   target: process.env.SOCKET_URL || 'http://127.0.0.1:2053'
    //   // target: 'http://192.168.8.118:3000'
    // }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/front/auth/login/', method: 'post', propertyName: 'accessToken' },
          logout: false,
          user: { url: '/front/auth/player', method: 'get', propertyName: false }
        }
        // tokenRequired: false,
        // tokenType: false
      }
    },
    cookie: {
      prefix: 'front.',
      options: {
        path: '/'
      }
    },
    redirect: false
    // token: {
    //   prefix: 'front.'
    // }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      compact: true
    }
  }
}
