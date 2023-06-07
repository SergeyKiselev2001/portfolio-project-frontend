import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import classes from './Tag.module.scss'
import { useTranslation } from 'react-i18next'
import { QueryParams } from '@app/config/router'

interface ITag {
  tagName: i18Tags
}

const Tag = ({ tagName }: ITag) => {
  const { t } = useTranslation('tags')
  return (
    <div className={classes.Tag}>
      <a
        href={`?${QueryParams.TAGS}=${tagName}`}
        target="_blank"
        rel="noreferrer"
        className={classes[tagName]}
      >
        {t(tagName)}
      </a>
    </div>
  )
}

export default Tag
