import { i18Chunks, i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import { useTranslation } from 'react-i18next'
import { tagClasses } from '@entities/Tag'
import classes from './ProfilePage.module.scss'

interface IUserSubscriptions {
  subscriptions: {
    users: string[]
    tags: i18Tags[]
  }
}

export const UserSubscriptions = (props: IUserSubscriptions) => {
  const { subscriptions } = props
  const { t } = useTranslation(i18Chunks.TAGS)

  return (
    <div className={classes.UserSubscriptions}>
      {!subscriptions.tags.length && !subscriptions.users.length && (
        <span className={classes.not_found}>Нет подписок</span>
      )}
      {subscriptions.tags.map((tag) => (
        <a
          href={`/?tag=${tag}`}
          className={`${tagClasses[tag]} ${classes.tag}`}
          key={tag}
        >
          {t(tag)}
        </a>
      ))}
      {subscriptions.users.map((user) => (
        <a href={`/@${user}`} className={classes.user} key={user}>
          {user}
        </a>
      ))}
    </div>
  )
}
