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
