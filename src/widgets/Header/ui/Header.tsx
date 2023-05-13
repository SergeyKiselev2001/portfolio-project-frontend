import { useTranslation } from 'react-i18next'
import classes from './Header.module.scss'
import { i18KeysHeader } from '@widgets/LangSwitcher'
import { RouterPaths } from '@app/config/router/schema'
import { Link } from 'react-router-dom'

const Header = () => {
  const { t } = useTranslation('header')

  return (
    <header className={classes.Header}>
      <Link to={RouterPaths.MAIN}>{t(i18KeysHeader.MAIN_PAGE)}</Link>
      <Link to={RouterPaths.ABOUT}>{t(i18KeysHeader.ABOUT_PROJECT)}</Link>
      <Link to={RouterPaths.PROFILE}>{t(i18KeysHeader.PROFILE)}</Link>
    </header>
  )
}

export default Header
