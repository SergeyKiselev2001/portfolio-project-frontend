import { useEffect, useState } from 'react'
import classes from './BlockSideInfo.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { BlockSideSkeleton } from './BlockSideSkeleton'
import { AsideStatus } from '../types/schema'
import { observer } from 'mobx-react-lite'
import { user } from '@entities/user'

const BlockSideInfo = observer(() => {
  const [isAuthorized, setIsAuthorized] = useState(AsideStatus.LOADING)

  useEffect(() => {
    user.login && setIsAuthorized(AsideStatus.AUTHORIZED)
  }, [user.login])

  useEffect(() => {
    if (getStorageItem(StorageKeys.AUTH)) {
      ;(async () => {
        await user.getUserInfoByJWT()
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
          <div className={classes.mainInfo}>{user.login}</div>
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
