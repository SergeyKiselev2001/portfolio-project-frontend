import { makeAutoObservable } from 'mobx'
import { IUserState, SystemRoles } from './schema'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { tryRequest } from '@shared/utils'
import { api } from '@app/api'

class User implements IUserState {
  id = 0
  login = ''
  followers = []
  followersAmount = 0
  subscriptions = {
    users: [],
    tags: [],
  }
  ignoreList = {
    tags: [],
  }
  systemRole = SystemRoles.USER
  newNotifications = false
  avatar = {
    src: '',
    alt: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfoByJWT = async () => {
    const token = getStorageItem(StorageKeys.AUTH)

    await tryRequest(async () => {
      const data = await api.get('/userInfo', {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })

      this.setUserInfo(data.data)
    })
  }

  setUserInfo = (userInfo: IUserState) => {
    for (const key in userInfo) {
      this[key as keyof User] = userInfo[key as keyof IUserState] as never
    }
  }
}

export default new User()
