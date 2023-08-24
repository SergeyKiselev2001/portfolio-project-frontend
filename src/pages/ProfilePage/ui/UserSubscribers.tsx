import { i18Chunks, i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import { useTranslation } from 'react-i18next'
import classes from './ProfilePage.module.scss'
import { user } from '@entities/user'
import { observer } from 'mobx-react-lite'

export const UserSubscribers = observer(() => {
  const { t } = useTranslation(i18Chunks.TAGS)

  return (
    <div className={classes.UserSubscriptions}>
      {!user.subscribers.length && (
        <span className={classes.not_found}>Нет подписчиков</span>
      )}
      {Array.from(new Set(user.subscribers)).map((user) => (
        <a href={`/@${user}`} className={classes.user} key={user}>
          {user}
        </a>
      ))}
    </div>
  )
})
