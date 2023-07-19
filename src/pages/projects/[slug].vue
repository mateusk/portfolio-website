<script setup lang="ts">
  import type { ProjectPage, Image, Video } from '@/types'
  import { getStaticAssetUrl, defaultImageSizes } from '@/utils'
  import { useWindowScroll } from '@vueuse/core'

  const { path } = useRoute()
  const slug = path.split('/').pop() as string

  const heroMediaWrapper = ref<HTMLElement | null>(null)

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
          title: data.title,
          text: data.text,
          heroMedia: {
            src: getStaticAssetUrl(data.heroMedia.src),
          } as Video,
          mobileShowcase: {
            layout: data.mobileShowcase.layout,
            devices: data.mobileShowcase.devices.map((showcaseEntry: any) => ({
              type: showcaseEntry.type,
              content: {
                type: showcaseEntry.content.type,
                src: showcaseEntry.content.src,
                alt: showcaseEntry?.content.alt,
                srcset: showcaseEntry?.content.srcset,
              } as Image | Video,
            })),
          },
          fullscreenImage: {
            src: data?.fullscreenImage.src,
            alt: data?.fullscreenImage.alt,
          } as Image,
          projectUrl: data.projectUrl,
          credits: data.credits,
        } as ProjectPage
      },
    }
  )

  const scroll = computed(() => {
    if (!heroMediaWrapper.value || !heroMediaWrapper.value.parentElement) {
      return 0
    }
    const { y: scrollY } = useWindowScroll()

    const scrollPercent = scrollY.value / window.innerHeight
    const scroll = scrollPercent < 0 ? 0 : scrollPercent > 1 ? 1 : scrollPercent

    return scroll
  })

  const pageError = computed(() => {
    if (error.value) {
      return error.value
    }
    if (!content.value) {
      return 'Page not found'
    }
    return null
  })

  /* -------------------------------- Methods ------------------------------- */

  function openProject() {
    window.open(content.value?.projectUrl, '_blank')
  }
</script>

<template>
  <main
    v-if="!pending && content"
    ref="heroMediaWrapper"
  >
    <section class="project-intro">
      <div class="content-wrapper">
        <h1>{{ content.title }}</h1>
        <div class="text-container">
          <p
            v-for="(paragraph, index) in content.text"
            :key="index"
          >
            {{ paragraph }}
          </p>
          <LabelButton
            v-if="content.projectUrl"
            type="primary"
            label="View project"
            @click="openProject"
          />
        </div>
      </div>
    </section>
    <div class="project-hero-media-wrapper">
      <ClientOnly>
        <ProjectHeroMedia
          v-if="content.heroMedia"
          :media="content.heroMedia"
          :scroll="scroll"
          class="project-hero-media"
        />
      </ClientOnly>
    </div>
    <section
      class="device-mockups-container"
      :class="content.mobileShowcase.layout"
    >
      <ProjectDeviceMockup
        v-for="(showcaseEntry, index) in content.mobileShowcase.devices"
        class="device-mockup"
        :class="{
          ipad: showcaseEntry.type === 'ipad',
          iphone: showcaseEntry.type === 'iphone',
        }"
        :key="index"
        :type="showcaseEntry.type"
        :content="showcaseEntry.content"
      />
    </section>
    <section
      class="fullscreen-image-container"
      v-if="content.fullscreenImage"
    >
      <NuxtImg
        :src="content.fullscreenImage.src"
        :alt="content.fullscreenImage.alt"
        :sizes="defaultImageSizes"
      />
    </section>
    <ProjectCredits
      v-if="content.credits"
      :credits="content.credits"
    />
  </main>
</template>

<style scoped>
  main {
    position: relative;
  }

  section {
    box-sizing: border-box;
  }

  .project-intro {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - var(--header-height));
  }

  .project-intro .content-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 5%;
  }

  .project-intro h1 {
    flex-basis: 30%;
    font-size: 2.38rem;
  }

  .project-intro .text-container {
    flex-basis: 50%;
  }

  .project-intro .text-container button {
    margin-top: 2rem;
  }

  .project-hero-media-wrapper {
    position: absolute;
    top: calc(var(--header-height) * -1);
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 300vh;
  }

  .project-hero-media {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  .device-mockups-container {
    position: relative;
    width: 100%;
  }

  .device-mockups-container.side-by-side {
    display: grid;
    grid-template-columns: 66% 33%;
    height: 200vh;
    margin-top: 200vh;
  }

  .device-mockups-container.side-by-side .device-mockup {
    height: 80vh;
  }

  .device-mockups-container.side-by-side .device-mockup.ipad {
    position: sticky;
    top: 10vh;
    align-self: start;
    margin-bottom: 10vh;
    translate: -20% 0;
  }

  .device-mockups-container.side-by-side .device-mockup.iphone {
    align-self: end;
    justify-self: center;
    margin-bottom: 10vh;
  }

  .fullscreen-image-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    translate: calc(-1 * var(--padding)) 0;
  }

  .fullscreen-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
