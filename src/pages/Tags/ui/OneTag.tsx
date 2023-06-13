import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import classes from './Tags.module.scss'
import { useTranslation } from 'react-i18next'
import { CLIENT } from '@shared/constants'
import linkImg from './images/link.png'
import { useState } from 'react'

interface IOneTag {
  postsAmount: number
  type: i18Tags
}

const OneTag = (props: IOneTag) => {
  const { postsAmount, type } = props
  const { t } = useTranslation('tags')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  const toggleSubscription = () => {
    setIsSubscribed((prev) => !prev)
  }

  const toggleBlock = () => {
    setIsBlocked((prev) => !prev)
  }

  return (
    <div className={classes.OneTag}>
      <div className={`${classes.main} ${classes[type]}`}>
        <div className={classes.texts}>
          <h3>{t(type)}</h3>
          <span>{postsAmount} постов</span>
        </div>

        <a
          rel="noreferrer"
          target="_blank"
          href={`${CLIENT}?tags_like=${type}`}
        >
          <img src={linkImg} alt="link" />
        </a>
      </div>
      <div className={classes.bottom}>
        <button onClick={toggleSubscription}>
          {isSubscribed ? 'Отписаться' : 'Подписаться'}
        </button>
        <button onClick={toggleBlock}>
          {isBlocked ? 'Разблокировать' : 'Заблокировать'}
        </button>
      </div>
    </div>
  )
}

export default OneTag
