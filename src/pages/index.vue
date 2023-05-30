<script setup lang="ts">
  import type { IndexPage } from '@/types'

  const {
    data: content,
    pending,
    error,
  } = await useAsyncData(
    'index-page',
    () => queryContent('/').findOne() as Promise<IndexPage>,
    {
      transform: (data) => {
        return {
          title: data.body.children.find((child: any) => child.tag === 'h1')
            .children[0].value,
          text: data.body.children
            .filter((child: any) => child.tag === 'p')
            .map((child: any) => child.children[0].value),
        } as IndexPage
      },
    }
  )
</script>

<template>
  <main v-if="!pending && content">
    <div class="content-wrapper">
      <h1>{{ content.title }}</h1>
      <div class="text-container">
        <p
          v-for="(paragraph, index) in content.text"
          :key="index"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - var(--header-height));
    padding: 0 10%;
  }

  .content-wrapper {
    display: flex;
    gap: 10%;
  }

  h1 {
    flex-basis: 30%;
  }

  .text-container {
    flex-basis: 60%;
  }
</style>
