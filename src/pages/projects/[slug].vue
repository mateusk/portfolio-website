<script setup lang="ts">
  import type { ProjectPage, Image } from '@/types'
  import { defaultImageSizes } from '~/utils'

  const { path } = useRoute()
  const slug = path.split('/').pop() as string

  const {
    data: content,
    pending,
    error,
  } = await useAsyncData(
    slug,
    () => queryContent(path).findOne() as Promise<ProjectPage>,
    {
      transform: (data) => {
        return {
          title: data.body.children.find((child: any) => child.tag === 'h1')
            .children[0].value,
          text: data.body.children
            .filter((child: any) => child.tag === 'p')
            .map((child: any) => child.children[0].value),
          heroImage: {
            src: data.heroImageSrc,
            alt: data.heroImageAlt,
          } as Image,
        } as ProjectPage
      },
    }
  )

  const pageError = computed(() => {
    if (error.value) {
      return error.value
    }
    if (!content.value) {
      return 'Page not found'
    }
    return null
  })
</script>

<template>
  <main v-if="!pending && content">
    <section class="project-intro">
      <h1>{{ content.title }}</h1>
      <div class="text-container">
        <p
          v-for="(paragraph, index) in content.text"
          :key="index"
        >
          {{ paragraph }}
        </p>
      </div>
    </section>
    <ProjectHeroMedia
      v-if="content.heroImage"
      :media="content.heroImage"
      class="project-hero-image"
    />
  </main>
</template>

<style scoped>
  main {
    position: relative;
  }

  section {
    box-sizing: border-box;
    width: calc(100% - 2 * var(--padding));
  }

  .project-intro {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(100vh - var(--header-height));
    padding: 0 5%;
  }

  .project-intro h1 {
    flex-basis: 30%;
    font-size: 2.38rem;
  }

  .project-intro .text-container {
    flex-basis: 50%;
  }

  .project-hero-image {
    position: absolute;
    top: calc(var(--header-height) * -1);
    right: 0;
    z-index: -1;
    height: 100%;
  }
</style>
