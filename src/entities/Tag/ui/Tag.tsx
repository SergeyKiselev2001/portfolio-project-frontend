import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import classes from './Tag.module.scss'
import { useTranslation } from 'react-i18next'

interface ITag {
  tagName: i18Tags
}

const Tag = ({ tagName }: ITag) => {
  const { t } = useTranslation('tags')
  return (
    <div className={`${classes.Tag} ${classes[tagName]}`}>{t(tagName)}</div>
  )
}

export default Tag
