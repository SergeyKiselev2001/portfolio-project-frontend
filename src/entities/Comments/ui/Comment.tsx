import { IComment } from '../store/schema'
import classes from './Comments.module.scss'

const Comment = (props: IComment) => {
  const { text, id, author, timestamp, likes } = props

  return (
    <div className={classes.comment}>
      <h2> {author.name} </h2>
      <h1>{text}</h1>
    </div>
  )
}

export default Comment
