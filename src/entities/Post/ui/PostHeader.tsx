import { useEffect, useState } from 'react'
import classes from './Post.module.scss'
import dots from './images/dots.png'
import { posts } from '..'
import { TimeFormat, timeConverter } from '@shared/utils'
import { Link } from 'react-router-dom'
import { me } from '@entities/me'
import { SystemRoles } from '@entities/user'

interface IPostHeader {
  isPostPage?: boolean
  id: number
  timestamp: number
  author: {
    login: string
    id: number
    avatar: {
      src: string
      alt: string
    }
  }
}

const PostHeader = (props: IPostHeader) => {
  const { timestamp, author, id, isPostPage } = props
  const { avatar, login } = author

  const body = document.getElementsByTagName('body')[0]

  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = () => {
    setShowOptions((prev) => !prev)
    body.removeEventListener('click', toggleOptions)
  }

  useEffect(() => {
    if (showOptions) {
      setTimeout(() => body.addEventListener('click', toggleOptions), 100)
    }
  }, [showOptions])

  const hidePost = () => {
    posts.hidePost(id)
  }

  const reportPost = () => {
    posts.sendReport(id)
  }

  const deletePost = () => {
    posts.deletePost(id)
  }

  return (
    <div className={classes.PostHeader}>
      <div className={classes.leftHeader}>
        <Link to={`/@${login}`}>
          <img className={classes.avatar} {...avatar} />
        </Link>

        <div className={classes.info}>
          <Link to={`/@${login}`}>{login}</Link>
          <time dateTime="<дата и время>">
            {timeConverter(timestamp, TimeFormat.FORMAT_1)}
          </time>
        </div>
      </div>

      <div className={classes.rightHeader}>
        <img
          onClick={toggleOptions}
          className={classes.dots}
          src={dots}
          alt="dots"
        />
        {showOptions && (
          <div className={classes.options}>
            {!isPostPage && <span onClick={hidePost}>Скрыть</span>}
            <span onClick={reportPost}>Пожаловаться</span>
            {(me.login == author.login ||
              me.systemRole == SystemRoles.ADMIN) && (
              <span onClick={deletePost}>Удалить</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostHeader
