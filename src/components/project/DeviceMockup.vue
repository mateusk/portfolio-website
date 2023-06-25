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
          src: '/mockups/iphone-frame.webp',
          alt: 'iPhone frame',
        }
      case 'ipad':
        return {
          src: '/mockups/ipad-frame.webp',
          alt: 'iPad frame',
        }
      case 'macbook':
        return {
          src: '/mockups/macbook-frame.webp',
          alt: 'Macbook frame',
        }
      default:
        return {
          src: '/mockups/iphone-frame.webp',
          alt: 'iPhone frame',
        }
    }
  }) as ComputedRef<Image>
</script>

<template>
  <div
    class="device-mockup"
    :class="{ iphone: type === 'iphone', ipad: type === 'ipad' }"
  >
    <NuxtImg
      class="device-frame"
      :src="deviceFrameImg.src"
      :alt="deviceFrameImg.alt"
    />
    <div
      class="content-wrapper"
      :class="{ iphone: type === 'iphone', ipad: type === 'ipad' }"
    >
      <NuxtImg
        class="device-content img"
        :class="{ iphone: type === 'iphone' }"
        v-if="content.type === 'image'"
        :src="content.src"
        :alt="content.alt"
        sizes="sm: 320px, md: 640px, lg: 1024px, xl: 1280px, 2xl: 1536px"
      />
      <video
        class="device-content video"
        :class="{ iphone: type === 'iphone' }"
        v-else
        :src="getStaticAssetUrl(content.src)"
      />
    </div>
  </div>
</template>

<style scoped>
  * {
    --ipad-aspect-ratio-horizontal: 1.45;
    --iphone-aspect-ratio-horizontal: 2.02;
    --iphone-aspect-ratio-vertical: 0.49;
    --ipad-aspect-ratio-vertical: 0.68;
  }

  .device-mockup {
    display: grid;
  }

  .device-mockup.ipad {
    aspect-ratio: var(--ipad-aspect-ratio-horizontal);
  }

  .device-mockup.iphone {
    aspect-ratio: var(--iphone-aspect-ratio-vertical);
  }

  .device-frame,
  .content-wrapper {
    grid-area: 1 / 1;
  }

  .device-frame {
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .content-wrapper {
    align-self: center;
    justify-self: center;
    height: auto;
    overflow: hidden;
  }

  .content-wrapper.ipad {
    width: 91%;
    height: auto;
    aspect-ratio: var(--ipad-aspect-ratio-horizontal);
    mask-image: url('@/assets/images/mockups/ipad-mask.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }

  .content-wrapper.iphone {
    width: 95%;
    aspect-ratio: var(--iphone-aspect-ratio-vertical);
    mask-image: url('@/assets/images/mockups/iphone-mask.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }

  .device-content {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
