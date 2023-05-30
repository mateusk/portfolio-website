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
  heroImage: Image[]
  mobileShowcase: {
    iPhone: Image[]
    iPad: Image[]
  }
  gallery: Image[]
  tech: string[]
  link: string
}

export interface Image {
  src: string
  srcset: string
  alt: string
}
