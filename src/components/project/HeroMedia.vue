<script setup lang="ts">
  import type { Image, Video } from '@/types'
  import { defaultImageSizes } from '@/utils'

  const props = defineProps<{
    media: Image | Video
  }>()

  const mediaType = computed(() => {
    if (!props.media || !props.media.src) {
      return null
    }
    return props.media?.src.split('.')[1].toLowerCase() === 'mp4'
      ? 'video'
      : 'image'
  })

  const image = computed(() => {
    if (mediaType.value === 'image') {
      return props.media as Image
    }
    return null
  })
</script>

<template>
  <div class="hero-media">
    <div class="vignette"></div>
    <NuxtImg
      v-if="mediaType === 'image' && image"
      class="hero-image"
      :src="image.src"
      :alt="image.alt"
      :sizes="defaultImageSizes"
      preset="project"
    />
  </div>
</template>

<style scoped>
  .hero-media {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .vignette {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(
      circle,
      rgb(0 0 0 / 50%) 0%,
      rgb(0 0 0 / 75%) 100%
    );
  }

  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
</style>
