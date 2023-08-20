import { TimeFormat, timeConverter } from '@shared/utils'
import { IComment } from '../store/schema'
import classes from './Comments.module.scss'

const Comment = (props: IComment) => {
  const { text, author, timestamp } = props

  return (
    <div className={classes.comment}>
      <div className={classes.top_part}>
        <a href={`/@${author.name}`}>
          <img
            className={classes.avatar}
            src={author.avatar.src}
            alt={author.avatar.alt}
          />
        </a>

        <div className={classes.top_part__info}>
          <a href={`/@${author.name}`}>{author.name}</a>
          <time dateTime={`${timestamp}`}>
            {timeConverter(timestamp, TimeFormat.FORMAT_2)} назад
          </time>
        </div>
      </div>
      <div className={classes.bottom_part}>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Comment
