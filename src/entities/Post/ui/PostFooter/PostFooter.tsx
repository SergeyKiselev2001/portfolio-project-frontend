import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import FooterTags from './FooterTags'
import heartImage from './images/heart.png'
import classes from './PostFooter.module.scss'
import { CLIENT } from '@shared/constants'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { posts } from '@entities/Post'
import { mainPage } from '@pages/MainPage'

interface IPostFooter {
  id: number
  likesAmount: number
  commentsAmount: number
  views: number
  tags: i18Tags[]
  isLiked: boolean
}

const PostFooter = (props: IPostFooter) => {
  const { likesAmount, commentsAmount, tags, views, id, isLiked } = props

  const [linkCopied, setLinkCopied] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(likesAmount)
  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked)

  const copyPath = () => {
    navigator.clipboard.writeText(`${CLIENT}/media/${id}`)
    setLinkCopied(true)
    toast.success('Ссылка скопирована')
  }

  const toggleLikes = () => {
    if (currentIsLiked) {
      setCurrentLikes((likes) => likes - 1)
      setCurrentIsLiked(false)
      posts.removeLike(id, currentLikes - 1)
    } else {
      setCurrentLikes((likes) => likes + 1)
      setCurrentIsLiked(true)
      posts.likePost(id, currentLikes + 1)
    }
  }

  const likePost = () => {
    if (!getStorageItem(StorageKeys.AUTH)) {
      mainPage.toggleLoginModal()
    } else {
      toggleLikes()
    }
  }

  return (
    <div className={classes.PostFooter}>
      <FooterTags {...{ tags }} />
      <div className={classes.controls}>
        <div className={classes.leftBlock}>
          <button
            onClick={likePost}
            className={`${classes.likes} ${
              currentIsLiked && getStorageItem(StorageKeys.AUTH)
                ? classes.isLiked
                : ''
            }`}
          >
            <img src={heartImage} alt="" />
            <span>{currentLikes}</span>
          </button>
          <a href={`/media/${id}#comments`} className={classes.comments}>
            {commentsAmount}
          </a>
          <button className={classes.save} />
          <button
            onClick={copyPath}
            className={`${classes.share} ${linkCopied ? classes.copied : ''}`}
          />
        </div>
        <div className={classes.rightBlock}>
          <span className={classes.views}>{views}</span>
        </div>
      </div>
    </div>
  )
}

export default PostFooter
