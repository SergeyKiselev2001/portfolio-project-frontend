import { QueryParams } from '@app/config/router'
import { ContentType, INewPost } from '../ui/schema'

export interface IPosts {
  posts: INewPost[]
  currentPage: number
  amountOfPages: number
  limit: number
}

export type QueryParamsObj = [QueryParams, string | null]

export interface IPostContent {
  title: string
  id: number
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
}
