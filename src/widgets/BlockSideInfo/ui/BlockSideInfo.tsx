import { useEffect, useState } from 'react'
import classes from './BlockSideInfo.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { BlockSideSkeleton } from './BlockSideSkeleton'
import { AsideStatus } from '../types/schema'
import { observer } from 'mobx-react-lite'
import { me } from '@entities/me'
import { useTranslation } from 'react-i18next'
import { i18Chunks, i18Keys } from '@widgets/LangSwitcher/types/i18Keys'
import { Link } from 'react-router-dom'
import { RouterPaths } from '@app/config/router'
import { blockSideInfo } from '..'
import { wordForm } from '@shared/utils'

const BlockSideInfo = observer(() => {
  const [isAuthorized, setIsAuthorized] = useState(AsideStatus.LOADING)
  const { t, i18n } = useTranslation(i18Chunks.TRANSLATION)

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
    blockSideInfo.toggleLoginModal()
  }

  const logOutHandle = () => {
    localStorage.removeItem(StorageKeys.AUTH)
    sessionStorage.removeItem(StorageKeys.AUTH)
    location.reload()
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
          <div className={classes.subscribers}>
            {me.followersAmount}{' '}
            {i18n.language == 'en'
              ? t(i18Keys.SUBSCRIBERS)
              : wordForm(
                  'подписчик',
                  'подписчика',
                  'подписчиков',
                  me.followersAmount
                )}
          </div>
          <div className={classes.createPost}>
            <Link to={RouterPaths.CREATE_POST}>{t(i18Keys.CREATE_POST)}</Link>
          </div>
          <div className={classes.logOut}>
            <button onClick={logOutHandle}>{t(i18Keys.LOG_OUT)}</button>
          </div>
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
