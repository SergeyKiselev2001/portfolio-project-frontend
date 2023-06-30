import { useEffect, useState } from 'react'
import classes from './BlockSideInfo.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { BlockSideSkeleton } from './BlockSideSkeleton'
import { AsideStatus } from '../types/schema'
import { observer } from 'mobx-react-lite'
import { me } from '@entities/me'
import { mainPage } from '@pages/MainPage'
import { useTranslation } from 'react-i18next'
import { i18Chunks, i18Keys } from '@widgets/LangSwitcher/types/i18Keys'

const BlockSideInfo = observer(() => {
  const [isAuthorized, setIsAuthorized] = useState(AsideStatus.LOADING)
  const { t } = useTranslation(i18Chunks.TRANSLATION)

  useEffect(() => {
    me.login && setIsAuthorized(AsideStatus.AUTHORIZED)
  }, [me.login])

  useEffect(() => {
    if (getStorageItem(StorageKeys.AUTH)) {
      ;(async () => {
        await me.getUserInfoByJWT()
        setIsAuthorized(AsideStatus.AUTHORIZED)
      })()
    } else {
      setIsAuthorized(AsideStatus.NOT_AUTHORIZED)
    }
  }, [])

  const openModal = () => {
    mainPage.toggleLoginModal()
  }

  return (
    <div
      className={classes.BlockSideInfo}
      {...(isAuthorized == AsideStatus.LOADING && {
        style: { border: 'none' },
      })}
    >
      {isAuthorized == AsideStatus.LOADING && <BlockSideSkeleton />}
      {isAuthorized == AsideStatus.AUTHORIZED && (
        <>
          <div className={classes.mainInfo}>{me.login}</div>
          <div className={classes.subscribers}>10 Подписчиков</div>
          <div className={classes.links}>ссылки</div>
          <button>Добавить пост</button>
        </>
      )}
      {isAuthorized == AsideStatus.NOT_AUTHORIZED && (
        <div className={classes.unauthorized}>
          <button onClick={openModal}>{t(i18Keys.LOG_IN)}</button>
        </div>
      )}
    </div>
  )
})

export default BlockSideInfo
