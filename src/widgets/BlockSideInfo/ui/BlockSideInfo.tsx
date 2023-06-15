import classes from './BlockSideInfo.module.scss'

const BlockSideInfo = () => {
  return (
    <div className={classes.BlockSideInfo}>
      <div className={classes.mainInfo}>Main</div>
      <div className={classes.subscribers}>10 Подписчиков</div>
      <div className={classes.links}>ссылки</div>
      <button>Добавить пост</button>
    </div>
  )
}

export default BlockSideInfo
