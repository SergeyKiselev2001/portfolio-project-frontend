import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import FooterTags from './FooterTags'
import heartImage from './images/heart.png'
import classes from './PostFooter.module.scss'

interface IPostFooter {
  id: number
  likesAmount: number
  commentsAmount: number
  views: number
  tags: i18Tags[]
}

const PostFooter = (props: IPostFooter) => {
  const { likesAmount, commentsAmount, tags, views, id } = props

  return (
    <div className={classes.PostFooter}>
      <FooterTags {...{ tags }} />
      <div className={classes.controls}>
        <div className={classes.leftBlock}>
          <button className={classes.likes}>
            <img src={heartImage} alt="" />
            <span>{likesAmount}</span>
          </button>
          <a href={`/media/${id}`} className={classes.comments}>
            {commentsAmount}
          </a>
          <button className={classes.save} />
          <button className={classes.share} />
        </div>
        <div className={classes.rightBlock}>
          <span className={classes.views}>{views}</span>
        </div>
      </div>
    </div>
  )
}

export default PostFooter
