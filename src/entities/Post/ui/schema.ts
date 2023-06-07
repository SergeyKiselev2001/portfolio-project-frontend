import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

export interface IPost {
  id: number
  title: string
  authorId: number
  authorName: string
  text: string
  image: {
    src: string
    alt: string
  }
}

export enum ContentType {
  TITLE = 'TITLE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  QUOTE = 'QUOTE',
}

export interface INewPost {
  id: number
  title: string
  timestamp: number
  author: {
    name: string
    id: number
    avatar: {
      src: string
      alt: string
    }
  }
  likesAmount: number
  isLiked: false
  commentsAmount: number
  views: number
  content: {
    type: ContentType
    text: string
    image?: {
      src: string
      alt: string
    }
  }[]
  poll?: {
    id: number
    name: string
    options: {
      id: number
      text: string
      numberOfVotes: number
    }[]
  }
  tags: i18Tags[]
}
