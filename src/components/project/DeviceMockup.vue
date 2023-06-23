<script setup lang="ts">
  import type { DeviceMockup } from '@/types'
  import type { Image } from '@/types'
  import { getStaticAssetUrl } from '@/utils'

  const props = defineProps<{
    type: DeviceMockup['type']
    content: DeviceMockup['content']
  }>()

  const deviceFrameImg = computed(() => {
    switch (props.type) {
      case 'iphone':
        return {
          src: '/mockups/iphone.webp',
          alt: 'iPhone frame',
        }
      case 'ipad':
        return {
          src: '/mockups/ipad.webp',
          alt: 'iPad frame',
        }
      case 'macbook':
        return {
          src: '/mockups/macbook.webp',
          alt: 'Macbook frame',
        }
      default:
        return {
          src: '/mockups/iphone.webp',
          alt: 'iPhone frame',
        }
    }
  }) as ComputedRef<Image>
</script>

<template>
  <div class="device-mockup">
    <NuxtImg
      class="device-frame"
      :src="deviceFrameImg.src"
      :alt="deviceFrameImg.alt"
    />
    <NuxtImg
      class="device-content img"
      :class="{ iphone: type === 'iphone' }"
      v-if="content.type === 'image'"
      :src="content.src"
      :alt="content.alt"
    />
    <video
      class="device-content video"
      :class="{ iphone: type === 'iphone' }"
      v-else
      :src="getStaticAssetUrl(content.src)"
      autoplay
      loop
      muted
    />
  </div>
</template>

<style scoped>
  .device-mockup {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
