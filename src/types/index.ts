import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface IndexPage extends ParsedContent {
  title: string
  description: string
  text: string[]
}

export interface ProjectPage extends ParsedContent {
  title: string
  description: string
  text: string[]
  heroMedia: Image | Video
  mobileShowcase: {
    iPhone: Image[]
    iPad: Image[]
  }
  gallery: Image[]
  tech: string[]
  projectUrl: string
}

export interface Image {
  src: string
  srcset: string
  alt: string
}

export interface Video {
  src: string
  alt: string
}
