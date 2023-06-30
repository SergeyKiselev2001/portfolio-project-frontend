import { makeAutoObservable } from 'mobx'
import { IUserState, SystemRoles } from './schema'
import { getApiHeader, tryRequest } from '@shared/utils'
import { api } from '@app/api'

export class User implements IUserState {
  login = ''
  followers = []
  status = ''
  followersAmount = 0
  subscribed = false
  subscriptions = {
    users: [],
    tags: [],
  }
  systemRole = SystemRoles.USER
  avatar = {
    src: '',
    alt: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async (name: string) => {
    await tryRequest(async () => {
      const data = await api.get(`/user/${name}`)

      this.setUserInfo(data.data.userInfo)
      this.login = name
    })
  }

  setUserInfo = (userInfo: IUserState) => {
    for (const key in userInfo) {
      this[key as keyof User] = userInfo[key as keyof IUserState] as never
    }
  }

  subscribeOnUser = async (myId: number) => {
    await tryRequest(async () => {
      await tryRequest(async () => {
        await api.post(
          `/users/${myId}`,
          { subscribeOn: this.login },
          getApiHeader()
        )
        this.subscribed = true
      })
    })
  }
}

export default new User()
