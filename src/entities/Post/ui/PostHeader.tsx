import { useEffect, useState } from 'react'
import classes from './Post.module.scss'
import dots from './images/dots.png'
import { posts } from '..'
import { TimeFormat, timeConverter } from '@shared/utils'

interface IPostHeader {
  id: number
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

const PostHeader = (props: IPostHeader) => {
  const { timestamp, author, id } = props
  const { avatar, name } = author

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

  return (
    <div className={classes.PostHeader}>
      <div className={classes.leftHeader}>
        <a rel="noreferrer" target="_blank" href={`/user/${name}`}>
          <img className={classes.avatar} {...avatar} />
        </a>

        <div className={classes.info}>
          <a rel="noreferrer" target="_blank" href={`/@${name}`}>
            {name}
          </a>
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
            <span onClick={hidePost}>Скрыть</span>
            <span onClick={reportPost}>Пожаловаться</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostHeader
