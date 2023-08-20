import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './Tags.module.scss'
import { RouterPaths } from '@app/config/router'
import { useEffect, useState } from 'react'
import OneTag from './OneTag'
import { i18Chunks, i18Keys } from '@widgets/LangSwitcher/types/i18Keys'
import { useTranslation } from 'react-i18next'
import tagsPage from './../store/index'
import { TagInfo } from '../store/schema'
import OneTagSkeleton from './OneTagSkeleton'
import { DEFAULT_NS } from '@shared/constants'
import { me } from '@entities/me'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'

const Tags = () => {
  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.TAGS)
    if (!getStorageItem(StorageKeys.AUTH)) {
      me.setIsDataLoaded(true)
    }

    ;(async () => {
      await tagsPage.loadTags()
      setCurrentTags(tagsPage.tags)
      setSpinner(false)
    })()
  }, [])

  const [currentTags, setCurrentTags] = useState<TagInfo[]>()
  const [inputValue, setInputValue] = useState('')
  const [spinner, setSpinner] = useState(true)
  const { t } = useTranslation(i18Chunks.TAGS)

  const inputHandler = (e: InputChange) => {
    setInputValue(e.target.value)
  }

  const applyInputValue = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inputValue) {
      const sortedTags = tagsPage.tags?.filter(({ type }) =>
        t(type).toLowerCase().includes(inputValue.toLowerCase())
      )
      setCurrentTags(sortedTags)
    } else {
      setCurrentTags(tagsPage.tags)
    }
  }

  const showSubscriptions = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentTags(tagsPage.tags.filter((tag) => tag.status.isSubscribed))
  }

  const showBlockedTags = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentTags(tagsPage.tags.filter((tag) => tag.status.isBlocked))
  }

  const showAll = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentTags(tagsPage.tags)
  }

  return (
    <div className={classes.Tags}>
      <div className={classes.tags_content}>
        <h1 className={classes.title}>{t(i18Keys.TAGS, DEFAULT_NS)}</h1>
        <div className={classes.search}>
          <form className={classes.search_form}>
            <input
              placeholder={`${t(i18Keys.SEARCH, DEFAULT_NS)}`}
              onChange={inputHandler}
              value={inputValue}
              type="text"
            />
            <span className={classes.loupe} />
            <button onClick={applyInputValue}>
              {t(i18Keys.FIND, DEFAULT_NS)}
            </button>
          </form>
          {me.login && (
            <div className={classes.buttons}>
              <button onClick={showSubscriptions}>
                {t(i18Keys.MY_SUBSCRIPTIONS, DEFAULT_NS)}
              </button>
              <button onClick={showBlockedTags}>
                {t(i18Keys.BLACK_LIST, DEFAULT_NS)}
              </button>
              <button onClick={showAll}>{t(i18Keys.ALL, DEFAULT_NS)}</button>
            </div>
          )}
        </div>
        <div className={classes.tags_list}>
          {currentTags &&
            !spinner &&
            currentTags.map(
              ({ type, amount, status: { isSubscribed, isBlocked } }) => (
                <OneTag
                  key={type}
                  type={type}
                  postsAmount={amount}
                  isBlocked={isBlocked}
                  isSubscribed={isSubscribed}
                />
              )
            )}
          {!currentTags?.length && !spinner && (
            <div className={classes.notFound}>
              {t(i18Keys.NOT_FOUND, DEFAULT_NS)}
            </div>
          )}
          {spinner && (
            <>
              <OneTagSkeleton isLogged={!!me.login} />
              <OneTagSkeleton isLogged={!!me.login} />
              <OneTagSkeleton isLogged={!!me.login} />
              <OneTagSkeleton isLogged={!!me.login} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default withHeader(Tags)
