import React from 'react'
import classes from './Post.module.scss'
import { ContentType } from './schema'
import { IPostContent } from '../store/schema'

const PostContent = (props: Partial<IPostContent>) => {
  const { content, title, id } = props as IPostContent

  return (
    <div className={classes.PostContent}>
      <div className={classes.title}>
        <a target="_blank" rel="noreferrer" href={`/post/${id}`}>
          {title}
        </a>
      </div>
      {content.map(({ text, type, image }, id) => (
        <React.Fragment key={id}>
          {type == ContentType.TEXT && (
            <span className={classes.text}>{text}</span>
          )}
          {type == ContentType.IMAGE && (
            <img src={image?.src} alt={image?.alt} />
          )}
          {type == ContentType.QUOTE && (
            <span className={classes.quote}>{text}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default PostContent
