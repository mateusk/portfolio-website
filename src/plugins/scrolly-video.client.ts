import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ScrollyVideo', ScrollyVideo)
})
