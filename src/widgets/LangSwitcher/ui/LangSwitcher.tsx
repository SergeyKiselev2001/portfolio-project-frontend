import { useTranslation } from 'react-i18next'
import classes from './LangSwitcher.module.scss'

const LangSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language == 'en' ? 'ru' : 'en')
  }

  return (
    <div className={classes.LangSwitcher}>
      <button
        className={i18n.language == 'en' ? classes.ru : classes.en}
        onClick={toggleLanguage}
      />
    </div>
  )
}

export default LangSwitcher
