import { useTranslation } from 'react-i18next'
import classes from './Header.module.scss'
import { i18KeysHeader } from '@widgets/LangSwitcher'
import { RouterPaths } from '@app/config/router'
import OneLink from './OneLink'

const Header = () => {
  const { t } = useTranslation('header')

  return (
    <header className={classes.Header}>
      <OneLink link={RouterPaths.MAIN} text={t(i18KeysHeader.MAIN_PAGE)} />
      <OneLink link={RouterPaths.ABOUT} text={t(i18KeysHeader.ABOUT_PROJECT)} />
      <OneLink link={RouterPaths.PROFILE} text={t(i18KeysHeader.PROFILE)} />
    </header>
  )
}

export default Header
