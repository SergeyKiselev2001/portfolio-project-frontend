export interface ICommentsState {
  comments: IComment[]
}

export interface ICommentToSend {
  post_id: number
  text: string
}

export interface IComment {
  id: number
  post_id: number
  text: string
  likes: number
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
