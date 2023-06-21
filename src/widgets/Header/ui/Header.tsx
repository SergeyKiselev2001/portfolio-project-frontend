import { useTranslation } from 'react-i18next'
import classes from './Header.module.scss'
import { i18KeysHeader } from '@widgets/LangSwitcher'
import { RouterPaths } from '@app/config/router'
import OneLink from './OneLink'
import { observer } from 'mobx-react-lite'
import { HeaderPage } from '@shared/hocs/withHeader'
import { me } from '@entities/me'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@shared/hooks'

const Header = observer(() => {
  const { t } = useTranslation('header')
  const currentPage = HeaderPage.currentPage

  const [showMenu, setShowMenu] = useState(false)

  const isMediaQuery = useMediaQuery(960)

  useEffect(() => {
    me.getUserInfoByJWT()
  }, [])

  useEffect(() => {
    if (!isMediaQuery) {
      setShowMenu(false)
    }
  }, [isMediaQuery])

  const toggleMenu = () => setShowMenu((prev) => !prev)

  return (
    <header className={classes.Header}>
      <div
        className={`${classes.showLinks} ${
          showMenu ? classes.buttonActive : ''
        }`}
      >
        <button onClick={toggleMenu}>
          <div className={`${classes.line} ${classes.line_1}`} />
          <div className={`${classes.line} ${classes.line_2}`}>
            <span className={classes.leftPart} />
            <span className={classes.rightPart} />
          </div>
          <div className={`${classes.line} ${classes.line_3}`} />
        </button>
      </div>
      <div
        className={`${classes.links} ${
          showMenu ? classes.menuActiveMobile : ''
        }`}
      >
        <OneLink
          isActive={currentPage == RouterPaths.MAIN}
          link={RouterPaths.MAIN}
          text={t(i18KeysHeader.MAIN_PAGE)}
        />

        {me.login ? (
          <OneLink
            isActive={currentPage == `@${me.login}`}
            link={`/@${me.login}`}
            text={t(i18KeysHeader.PROFILE)}
          />
        ) : (
          <OneLink
            isActive={currentPage == RouterPaths.LOGIN}
            link={RouterPaths.LOGIN}
            text={t(i18KeysHeader.PROFILE)}
          />
        )}

        {me.login && (
          <OneLink
            isActive={currentPage == RouterPaths.SUBSCRIPTIONS}
            link={RouterPaths.SUBSCRIPTIONS}
            text={'SUBSCRIPTIONS'}
          />
        )}

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
    </header>
  )
})

export default Header
