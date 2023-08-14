import {
  i18Chunks,
  i18Keys,
  i18Tags,
} from '@widgets/LangSwitcher/types/i18Keys'
import classes from './Tags.module.scss'
import { useTranslation } from 'react-i18next'
import { CLIENT, DEFAULT_NS } from '@shared/constants'
import linkImg from './images/link.png'
import { useState } from 'react'
import { wordForm } from '@shared/utils'
import { me } from '@entities/me'
import tagsPage from './../store/index'
import { observer } from 'mobx-react-lite'
import { useDebounce } from '@shared/hooks'

interface IOneTag {
  postsAmount: number
  isSubscribed: boolean
  isBlocked: boolean
  type: i18Tags
}

const OneTag = observer((props: IOneTag) => {
  const { postsAmount, type } = props
  const { t, i18n } = useTranslation(i18Chunks.TAGS)

  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribed)
  const [isBlocked, setIsBlocked] = useState(props.isBlocked)

  const setCallbackForSubscription = useDebounce(500)
  const [isSubscribedOnServer, setIsSubscribedOnServer] = useState(
    props.isSubscribed
  )

  const setCallbackForBlock = useDebounce(500)
  const [isBlockedOnServer, setIsBlockedOnServer] = useState(props.isBlocked)

  const toggleSubscription = async () => {
    if (isSubscribed) {
      setCallbackForSubscription(() => {
        if (isSubscribedOnServer) {
          tagsPage.unsubscribeFromTag(type)
          setIsSubscribedOnServer(false)
        }
      })

      setIsSubscribed(false)
    } else {
      setCallbackForSubscription(() => {
        if (!isSubscribedOnServer) {
          tagsPage.subscribeOnTag(type)
          setIsSubscribedOnServer(true)
        }
      })

      setIsBlocked(false)
      setIsSubscribed(true)
    }
  }

  const toggleBlock = async () => {
    if (isBlocked) {
      setCallbackForBlock(() => {
        if (isBlockedOnServer) {
          tagsPage.unblockTag(type)
          setIsBlockedOnServer(false)
        }
      })

      setIsBlocked(false)
    } else {
      setCallbackForBlock(() => {
        if (!isBlockedOnServer) {
          tagsPage.blockTag(type)
          setIsBlockedOnServer(true)
        }
      })

      setIsBlocked(true)
      setIsSubscribed(false)
    }
  }

  return (
    <div className={classes.OneTag}>
      <div className={`${classes.main} ${classes[type]}`}>
        <div className={classes.texts}>
          <h3>{t(type)}</h3>
          <span>
            {postsAmount}{' '}
            {i18n.language == 'ru'
              ? wordForm('Пост', 'Поста', 'Постов', postsAmount)
              : t(i18Keys.POSTS, DEFAULT_NS)}
          </span>
        </div>
        <a href={`${CLIENT}?tag=${type}`}>
          <img src={linkImg} alt="link" />
        </a>
      </div>
      {me.login && (
        <div className={classes.bottom}>
          <button
            onClick={toggleSubscription}
            className={isSubscribed ? classes.active : ''}
          >
            {isSubscribed
              ? t(i18Keys.UNSUBSCRIBE, DEFAULT_NS)
              : t(i18Keys.SUBSCRIBE, DEFAULT_NS)}
          </button>
          <button
            onClick={toggleBlock}
            className={isBlocked ? classes.active : ''}
          >
            {isBlocked
              ? t(i18Keys.UNBLOCK, DEFAULT_NS)
              : t(i18Keys.BLOCK, DEFAULT_NS)}
          </button>
        </div>
      )}
    </div>
  )
})

export default OneTag
