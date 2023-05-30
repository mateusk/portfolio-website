<script setup lang="ts">
  import type { Image } from '@/types'
  import { getStaticAssetUrl } from '@/utils'

  const logo = {
    src: getStaticAssetUrl('logo/logo.svg'),
    alt: 'Logo',
  } as Image
</script>

<template>
  <header>
    <NuxtLink to="/">
      <span class="ssr-only">Home</span>
      <img
        :src="logo.src"
        :alt="logo.alt"
        id="logo"
      />
    </NuxtLink>
    <NavMenu />
  </header>
</template>

<style scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 90px;
    padding: var(--padding);
  }

  #logo {
    width: auto;
    height: 30px;
  }
</style>
