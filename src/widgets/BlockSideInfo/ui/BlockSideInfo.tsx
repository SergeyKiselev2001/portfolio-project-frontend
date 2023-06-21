import { useEffect, useState } from 'react'
import classes from './BlockSideInfo.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { BlockSideSkeleton } from './BlockSideSkeleton'
import { AsideStatus } from '../types/schema'
import { observer } from 'mobx-react-lite'
import { me } from '@entities/me'

const BlockSideInfo = observer(() => {
  const [isAuthorized, setIsAuthorized] = useState(AsideStatus.LOADING)

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

  return (
    <div className={classes.BlockSideInfo}>
      {isAuthorized == AsideStatus.LOADING && <BlockSideSkeleton />}
      {isAuthorized == AsideStatus.AUTHORIZED && (
        <>
          <div className={classes.mainInfo}>{me.login}</div>
          <div className={classes.subscribers}>10 Подписчиков</div>
          <div className={classes.links}>ссылки</div>
          <button>Добавить пост</button>
        </>
      )}
      {isAuthorized == AsideStatus.NOT_AUTHORIZED && <span>heh</span>}
    </div>
  )
})

export default BlockSideInfo
