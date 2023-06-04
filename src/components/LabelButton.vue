<script setup lang="ts">
  import type { Image } from '@/types'
  import { getStaticAssetUrl } from '@/utils'

  defineProps<{
    type: 'primary' | 'secondary'
    label: string
  }>()

  const arrowIcon = computed(() => {
    return {
      src: getStaticAssetUrl('icons/arrow-dark.svg'),
      alt: 'Arrow icon',
    } as Image
  })
</script>

<template>
  <button>
    <span>{{ label }}</span>
    <img
      :src="arrowIcon.src"
      :alt="arrowIcon.alt"
    />
  </button>
</template>

<style scoped>
  button {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: var(--light-beige);
    border: none;
    border-radius: 50px;
  }

  button span {
    display: inline-block;
    font-family: 'HK Grotesk Bold', sans-serif;
    font-size: 0.8rem;
    color: var(--dark-coal);
    text-align: left;
    text-transform: uppercase;
    text-wrap: nowrap;
    letter-spacing: 0.1em;
  }

  button img {
    max-width: 20px;
  }
</style>
