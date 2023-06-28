import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './Tags.module.scss'
import { RouterPaths } from '@app/config/router'
import { useEffect } from 'react'
import OneTag from './OneTag'
import { i18Keys, i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import { useTranslation } from 'react-i18next'

const Tags = () => {
  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.TAGS)
  })

  const { t } = useTranslation()

  return (
    <div className={classes.Tags}>
      <div className={classes.tags_content}>
        <h1 className={classes.title}>{t(i18Keys.TAGS)}</h1>
        <div className={classes.search}>
          <form className={classes.search_form}>
            <input placeholder={`${t(i18Keys.SEARCH)}`} type="text" />
            <span className={classes.loupe} />
            <button>{t(i18Keys.FIND)}</button>
          </form>
          <div className={classes.buttons}>
            <button>{t(i18Keys.MY_SUBSCRIPTIONS)}</button>
            <button>{t(i18Keys.BLACK_LIST)}</button>
            <button>{t(i18Keys.ALL)}</button>
          </div>
        </div>
        <div className={classes.tags_list}>
          <OneTag type={i18Tags.ANIMALS} postsAmount={131} />
          <OneTag type={i18Tags.TECHNOLOGIES} postsAmount={272} />
          <OneTag type={i18Tags.HUMOR} postsAmount={140} />
        </div>
      </div>
    </div>
  )
}

export default withHeader(Tags)
