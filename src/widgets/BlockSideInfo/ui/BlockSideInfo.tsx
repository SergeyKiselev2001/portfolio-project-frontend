import { useEffect, useState } from 'react'
import classes from './BlockSideInfo.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { BlockSideSkeleton } from './BlockSideSkeleton'

const BlockSideInfo = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (getStorageItem(StorageKeys.AUTH)) {
      setIsAuthorized(true)
    }
  }, [])

  return (
    <div className={classes.BlockSideInfo}>
      {!isAuthorized && <BlockSideSkeleton />}
      {isAuthorized && (
        <>
          <div className={classes.mainInfo}>Main</div>
          <div className={classes.subscribers}>10 Подписчиков</div>
          <div className={classes.links}>ссылки</div>
          <button>Добавить пост</button>
        </>
      )}
    </div>
  )
}

export default BlockSideInfo
