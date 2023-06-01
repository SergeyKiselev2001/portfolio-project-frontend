import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import classes from './PostFooter.module.scss'
import { Tag } from '@entities/Tag'

interface IFooterTags {
  tags: i18Tags[]
}

const FooterTags = ({ tags }: IFooterTags) => {
  return (
    <div className={classes.FooterTags}>
      {tags.map((tagName, key) => (
        <Tag key={key} {...{ tagName }} />
      ))}
    </div>
  )
}

export default FooterTags
