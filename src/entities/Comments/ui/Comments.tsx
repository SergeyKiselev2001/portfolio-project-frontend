import { ICommentsState } from '../store/schema'
import Comment from './Comment'
import classes from './Comments.module.scss'

const Comments = (props: ICommentsState) => {
  const { comments } = props

  return (
    <div className={classes.Comments}>
      {comments.map((comment) => (
        <Comment {...comment} key={comment.id} />
      ))}
    </div>
  )
}

export default Comments
