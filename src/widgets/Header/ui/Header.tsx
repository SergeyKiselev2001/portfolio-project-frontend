import { useTranslation } from 'react-i18next'
import classes from './Header.module.scss'
import { LangSwitcher, i18KeysHeader } from '@widgets/LangSwitcher'
import { RouterPaths } from '@app/config/router'
import OneLink from './OneLink'
import { observer } from 'mobx-react-lite'
import { HeaderPage } from '@shared/hocs/withHeader'

const Header = observer(() => {
  const { t } = useTranslation('header')
  const currentPage = HeaderPage.currentPage

  return (
    <header className={classes.Header}>
      <div className={classes.links}>
        <OneLink
          isActive={currentPage == RouterPaths.MAIN}
          link={RouterPaths.MAIN}
          text={t(i18KeysHeader.MAIN_PAGE)}
        />
        <OneLink
          isActive={currentPage == RouterPaths.PROFILE}
          link={RouterPaths.PROFILE}
          text={t(i18KeysHeader.PROFILE)}
        />
        <OneLink
          isActive={currentPage == RouterPaths.TAGS}
          link={RouterPaths.TAGS}
          text={t(i18KeysHeader.TAGS)}
        />
        <OneLink
          isActive={currentPage == RouterPaths.ABOUT}
          link={RouterPaths.ABOUT}
          text={t(i18KeysHeader.ABOUT_PROJECT)}
        />
      </div>

      {/* <LangSwitcher /> */}
    </header>
  )
})

export default Header
