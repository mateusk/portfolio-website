// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  css: ['~~/src/assets/css/main.css'],
  nitro: {
    preset: 'firebase',
  },
})
