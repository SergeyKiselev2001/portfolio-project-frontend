import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import { IPostContent } from '../store/schema'

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

export interface INewPost extends IPostContent {
  isPostPage?: boolean
  isProfilePage?: boolean
  isLast: boolean
  getNextPosts: VoidFunction
  timestamp: number
  author: {
    login: string
    id: number
    avatar: {
      src: string
      alt: string
    }
  }

  tags: i18Tags[]
}
