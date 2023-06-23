// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  css: ['~~/src/assets/css/main.css'],
  modules: ['@nuxt/content', '@nuxt/image-edge', '@nuxtjs/device'],

  nitro: {
    preset: 'firebase',
  },

  image: {
    dir: 'assets/images',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
    presets: {
      project: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 80,
        },
      },
    },
  },

  devtools: {
    enabled: true,
  },
})
