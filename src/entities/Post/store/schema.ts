import { QueryParams } from '@app/config/router'
import { INewPost } from '../ui/schema'

export interface IPosts {
  posts: INewPost[]
}

export type QueryParamsObj = [QueryParams, string | null]
