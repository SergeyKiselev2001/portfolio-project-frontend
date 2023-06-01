import classes from './Post.module.scss'
import { ContentType } from './schema'

interface IPostContent {
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

const PostContent = (props: IPostContent) => {
  const { content, poll } = props

  return (
    <div className={classes.PostContent}>
      <br />
      <br />
      {content
        .filter((el) => el.type == ContentType.TEXT)
        .map((el) => (
          <>
            <span key={el.text}>{el.text}</span>
            <br />
          </>
        ))}
      <br />
      <br />
      <br />
    </div>
  )
}

export default PostContent
