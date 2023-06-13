import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './Tags.module.scss'
import { RouterPaths } from '@app/config/router'
import { useEffect } from 'react'
import OneTag from './OneTag'
import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

const Tags = () => {
  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.TAGS)
  })

  return (
    <div className={classes.Tags}>
      <div className={classes.tags_content}>
        <h1 className={classes.title}>Теги</h1>
        <div className={classes.search}>
          <form className={classes.search_form}>
            <input placeholder="Поиск" type="text" />
            <span className={classes.loupe} />
            <button>Найти</button>
          </form>
          <div className={classes.buttons}>
            <button>Мои подписки</button>
            <button>Черный список</button>
            <button>Все</button>
          </div>
        </div>
        <div className={classes.tags_list}>
          <OneTag type={i18Tags.ANIMALS} postsAmount={13} />
          <OneTag type={i18Tags.TECHNOLOGIES} postsAmount={27} />
          <OneTag type={i18Tags.HUMOR} postsAmount={140} />
        </div>
      </div>
    </div>
  )
}

export default withHeader(Tags)
