import { makeAutoObservable } from 'mobx'
import { IMeState } from './schema'
import { getApiHeader, tryRequest } from '@shared/utils'
import { api } from '@app/api'
import { SystemRoles } from '@entities/user'

class Me implements IMeState {
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
    await tryRequest(async () => {
      const data = await api.get('/userInfo', getApiHeader())

      this.setUserInfo(data.data)
    })
  }

  setUserInfo = (userInfo: IMeState) => {
    for (const key in userInfo) {
      this[key as keyof Me] = userInfo[key as keyof IMeState] as never
    }
  }
}

export default new Me()
