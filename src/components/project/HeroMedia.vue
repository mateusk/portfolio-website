<script setup lang="ts">
  import type { Image, Video } from '@/types'
  import { defaultImageSizes } from '@/utils'

  const props = defineProps<{
    media: Image | Video
    scroll: number
  }>()

  const heroMedia = ref<HTMLDivElement | null>(null)

  const mediaType = computed(() => {
    if (!props.media || !props.media.src) {
      return null
    }
    return props.media?.src.split('.')[1].toLowerCase() === 'mp4'
      ? 'video'
      : 'image'
  })

  const heroMediaScale = computed(() => {
    const percent = 1.2 - props.scroll
    if (percent < 0.8) {
      return 0.8
    }
    return percent
  })

  const vignetteOpacity = computed(() => 1 - props.scroll * 2)
</script>

<template>
  <div
    class="hero-media-container"
    ref="heroMedia"
  >
    <div class="vignette"></div>
    <ScrollyVideo
      v-if="mediaType === 'video'"
      :src="media.src"
      :videoPercentage="props.scroll"
      class="hero-media"
      :trackScroll="false"
    />
    <NuxtImg
      v-if="mediaType === 'image'"
      :src="media.src"
      :sizes="defaultImageSizes"
      :alt="media.alt || media.src"
      class="hero-media"
    />
  </div>
</template>

<style scoped>
  .hero-media-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .vignette {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgb(0 0 0 / 50%) 0%,
      rgb(0 0 0 / 75%) 100%
    );
    opacity: v-bind(vignetteOpacity);
  }

  .hero-media {
    object-fit: cover;
    width: 100%;
    scale: v-bind(heroMediaScale);
  }
</style>
