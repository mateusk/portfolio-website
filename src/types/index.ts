import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

/* --------------------------- General data types --------------------------- */

interface Link {
  text: string
  url: string
}

/* ----------------------------- Page data types ---------------------------- */

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
    layout: string
    devices: DeviceMockup[]
  }
  fullscreenImage: Image
  gallery: Image[]
  tech: string[]
  projectUrl: string
  credits: {
    client: Link
    developedAt: Link
    year: string
    roles: [
      {
        role: string
        names: string[]
      }
    ]
  }
}

/* ---------------------------- Media data types ---------------------------- */

interface Media {
  type: 'image' | 'video'
  src: string
  alt?: string
  srcset?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export interface Image extends Media {
  type: 'image'
  src: string
  alt?: string
  srcset?: string
  autoplay?: never
  loop?: never
  muted?: never
}

export interface Video {
  type: 'video'
  src: string
  alt?: never
  srcset?: never
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

/* -------------------------- Component data types -------------------------- */

export interface DeviceMockup {
  type: 'ipad' | 'iphone' | 'macbook'
  content: Image | Video
}
