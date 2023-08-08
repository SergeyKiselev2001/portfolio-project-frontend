import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import FooterTags from './FooterTags'
import heartImage from './images/heart.png'
import classes from './PostFooter.module.scss'
import { CLIENT } from '@shared/constants'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blockSideInfo } from '@widgets/BlockSideInfo'
import { me } from '@entities/me'
import { clsx } from '@shared/utils'
import { posts } from '@entities/Post'
import { useDebounce } from '@shared/hooks'

interface IPostFooter {
  isPostPage?: boolean
  id: number
  likesAmount: number
  commentsAmount: number
  views: number
  tags: i18Tags[]
  isLiked?: boolean
  isSaved?: boolean
}

const PostFooter = (props: IPostFooter) => {
  const {
    likesAmount,
    commentsAmount,
    isPostPage,
    tags,
    views,
    id,
    isLiked,
    isSaved,
  } = props

  const [linkCopied, setLinkCopied] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(likesAmount)
  const [currentIsLiked, setCurrentIsLiked] = useState(Boolean(isLiked))
  const [currentViews, setCurrentViews] = useState('')
  const [currentIsSaved, setCurrentIsSaved] = useState(Boolean(isSaved))

  const [isLikedOnServer, setIsLikedOnServer] = useState(Boolean(isLiked))
  const [isSavedOnServer, setIsSavedOnServer] = useState(Boolean(isSaved))

  const setCallbackForLikes = useDebounce(500)
  const setCallbackForSaves = useDebounce(500)

  const viewsConverter = (number: number) => {
    const newViews = `${number}`.substring(0, `${number}`.length - 2)

    return `${newViews.substring(0, `${newViews}`.length - 1)}.${newViews.at(
      -1
    )}K`
  }

  useEffect(() => {
    if (views < 999) {
      setCurrentViews(`${views}`)
    } else {
      setCurrentViews(viewsConverter(views))
    }
  }, [])

  const copyPath = () => {
    navigator.clipboard.writeText(`${CLIENT}post/${id}`)
    setLinkCopied(true)
    toast.success('Ссылка скопирована')
  }

  const likePostHandle = () => {
    if (!me.login) {
      blockSideInfo.toggleLoginModal()
      return
    }

    if (currentIsLiked) {
      setCallbackForLikes(() => {
        if (isLikedOnServer) {
          posts.removeLike(id)
          setIsLikedOnServer(false)
        }
      })

      setCurrentIsLiked(false)
      setCurrentLikes(currentLikes - 1)
    } else {
      setCallbackForLikes(() => {
        if (!isLikedOnServer) {
          posts.likePost(id)
          setIsLikedOnServer(true)
        }
      })

      setCurrentIsLiked(true)
      setCurrentLikes(currentLikes + 1)
    }
  }

  const savePostHandle = () => {
    if (!me.login) {
      blockSideInfo.toggleLoginModal()
      return
    }

    if (currentIsSaved) {
      setCallbackForSaves(() => {
        if (isSavedOnServer) {
          posts.removeFromSaved(id)
          setIsSavedOnServer(false)
        }
      })
      setCurrentIsSaved(false)
    } else {
      setCallbackForSaves(() => {
        if (!isSavedOnServer) {
          posts.savePost(id)
          setIsSavedOnServer(true)
        }
      })
      setCurrentIsSaved(true)
    }
  }

  return (
    <div className={classes.PostFooter}>
      <FooterTags {...{ tags }} />
      <div className={classes.controls}>
        <div className={classes.leftBlock}>
          <button
            onClick={likePostHandle}
            className={clsx(
              { [classes.currentIsLiked]: currentIsLiked },
              classes.likes
            )}
          >
            <img src={heartImage} alt="" />
            <span>{currentLikes}</span>
          </button>
          {!isPostPage && (
            <Link
              target="_blank"
              to={`/post/${id}#comments`}
              className={classes.comments}
            >
              {commentsAmount}
            </Link>
          )}

          <button
            title="сохранить пост"
            onClick={savePostHandle}
            className={clsx(
              { [classes.currentIsSaved]: currentIsSaved },
              classes.save
            )}
          />
          <button
            onClick={copyPath}
            className={`${classes.share} ${linkCopied ? classes.copied : ''}`}
          />
        </div>
        <div className={classes.rightBlock}>
          <span className={classes.views}>{currentViews}</span>
        </div>
      </div>
    </div>
  )
}

export default PostFooter
