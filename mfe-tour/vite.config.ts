// mfe-visa/nuxt.config.ts

import federation from '@originjs/vite-plugin-federation'

export default defineNuxtConfig({
  vite: {
    plugins: [
      federation({
        name: 'mfeVisa',
        filename: 'remoteEntry.js',
        exposes: {
          './VisaApp': './components/VisaApp.vue',
        },
        shared: ['vue', 'vue-router'],
      })
    ]
  }
})
