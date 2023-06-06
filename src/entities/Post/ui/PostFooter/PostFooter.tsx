import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import FooterTags from './FooterTags'
import heartImage from './images/heart.png'
import classes from './PostFooter.module.scss'
import { CLIENT } from '@shared/constants'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface IPostFooter {
  id: number
  likesAmount: number
  commentsAmount: number
  views: number
  tags: i18Tags[]
}

const PostFooter = (props: IPostFooter) => {
  const { likesAmount, commentsAmount, tags, views, id } = props

  const [linkCopied, setLinkCopied] = useState(false)

  const copyPath = () => {
    navigator.clipboard.writeText(`${CLIENT}/media/${id}`)
    setLinkCopied(true)
    toast.success('Ссылка скопирована')
  }

  return (
    <div className={classes.PostFooter}>
      <FooterTags {...{ tags }} />
      <div className={classes.controls}>
        <div className={classes.leftBlock}>
          <button className={classes.likes}>
            <img src={heartImage} alt="" />
            <span>{likesAmount}</span>
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
