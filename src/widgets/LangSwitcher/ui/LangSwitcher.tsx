import { useTranslation } from 'react-i18next'
import classes from './LangSwitcher.module.scss'
import { i18Keys } from '../types/i18Keys'

const LangSwitcher = () => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language == 'en' ? 'ru' : 'en')
  }

  return (
    <div className={classes.LangSwitcher}>
      <button onClick={toggleLanguage}>{t(i18Keys.CHANGE_LANG)}</button>
    </div>
  )
}

export default LangSwitcher
