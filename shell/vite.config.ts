// shell/nuxt.config.ts

import federation from '@originjs/vite-plugin-federation'

export default defineNuxtConfig({
  vite: {
    plugins: [
      federation({
        name: 'shell',
        remotes: {
          mfeVisa: 'http://localhost:3001/assets/remoteEntry.js',
          mfeTour: 'http://localhost:3002/assets/remoteEntry.js',
        },
        shared: ['vue', 'vue-router'],
      })
    ]
  }
})
