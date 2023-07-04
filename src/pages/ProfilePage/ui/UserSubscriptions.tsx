import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

interface IUserSubscriptions {
  subscriptions: {
    users: string[]
    tags: i18Tags[]
  }
}

export const UserSubscriptions = (props: IUserSubscriptions) => {
  const { subscriptions } = props
  return (
    <div>
      {subscriptions.tags.map((tag) => (
        <h1 key={tag}>{tag}</h1>
      ))}
      {subscriptions.users.map((user) => (
        <h1 key={user}>{user}</h1>
      ))}
    </div>
  )
}
