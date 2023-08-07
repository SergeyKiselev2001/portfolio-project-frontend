export interface ICommentsState {
  comments: IComment[]
}

export interface IComment {
  id: number
  post_id: number
  text: string
  timestamp: number
  author: {
    name: string
    id: number
    avatar: {
      src: string
      alt: string
    }
  }
}
