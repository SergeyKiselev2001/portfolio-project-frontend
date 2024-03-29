import { makeAutoObservable } from 'mobx'
import { HeaderTheme, IUserState, SystemRoles } from './schema'
import { getApiHeader, tryRequest } from '@shared/utils'
import { api } from '@app/api'
import { me } from '@entities/me'

export class User implements IUserState {
  id = 0
  login = ''
  status = ''
  headerTheme = HeaderTheme.DEFAULT
  subscribed = false
  subscriptions = {
    users: [],
    tags: [],
  }
  subscribers = []
  systemRole = SystemRoles.USER
  avatar = {
    src: '',
    alt: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async (name: string) => {
    await tryRequest(
      async () => {
        const data = await api.get(`/users/${name}`)

        this.setUserInfo(data.data)
        this.login = name
      },
      undefined,
      { hideToast: true }
    )
  }

  setUserInfo = (userInfo: IUserState) => {
    for (const key in userInfo) {
      this[key as keyof User] = userInfo[key as keyof IUserState] as never
    }
  }

  unsubscribeFromUser = async () => {
    await tryRequest(async () => {
      await api.get(`/users/${this.login}/unsubscribe`, getApiHeader())
      this.subscribed = false
    })
  }

  subscribeOnUser = async () => {
    await tryRequest(async () => {
      await api.get(`/users/${this.login}/subscribe`, getApiHeader())
      this.subscribed = true
    })
  }

  updateSubscribers = (value: boolean) => {
    if (value) {
      this.subscribers.push(me.login as unknown as never)
    } else {
      this.subscribers = [...this.subscribers.filter((el) => el != me.login)]
    }
  }
}

export default new User()
