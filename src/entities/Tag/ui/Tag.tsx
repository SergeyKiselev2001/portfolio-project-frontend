import { i18Chunks, i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import classes from './Tag.module.scss'
import { useTranslation } from 'react-i18next'
import { QueryParams } from '@app/config/router'

interface ITag {
  tagName: i18Tags
}

const Tag = ({ tagName }: ITag) => {
  const { t } = useTranslation(i18Chunks.TAGS)
  return (
    <div className={classes.Tag}>
      <a href={`/?${QueryParams.TAG}=${tagName}`} className={classes[tagName]}>
        {t(tagName)}
      </a>
    </div>
  )
}

export default Tag
