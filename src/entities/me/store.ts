import { makeAutoObservable } from 'mobx'
import { IMeState } from './schema'
import { getApiHeader, tryRequest } from '@shared/utils'
import { api } from '@app/api'
import { HeaderTheme, SystemRoles, user } from '@entities/user'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'

class Me implements IMeState {
  isDataLoaded = false
  id = 0
  login = ''
  headerTheme = HeaderTheme.DEFAULT
  subscriptions = {
    users: [],
    tags: [],
  }
  followersAmount = 0
  ignoreList = {
    tags: [],
  }
  systemRole = SystemRoles.GUEST
  avatar = {
    src: '',
    alt: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  setIsDataLoaded = (value: boolean) => {
    this.isDataLoaded = value
  }

  getUserInfoByJWT = async () => {
    await tryRequest(async () => {
      if (getStorageItem(StorageKeys.AUTH)) {
        const data = await api.get('/users/me', getApiHeader())
        this.setIsDataLoaded(true)
        this.setUserInfo(data.data)
      }
    })
  }

  setUserInfo = (userInfo: IMeState) => {
    for (const key in userInfo) {
      this[key as keyof Me] = userInfo[key as keyof IMeState] as never
    }
  }

  updateStatus = async (newStatus: string) => {
    await tryRequest(async () => {
      await api.post(
        `/users/${this.login}/setStatus`,
        { newStatus },
        getApiHeader()
      )
      user.setUserInfo({
        status: newStatus,
      })
    })
  }

  updateTheme = async (newTheme: HeaderTheme) => {
    await tryRequest(async () => {
      await api.post(
        `/users/${this.login}/setTheme`,
        { newTheme },
        getApiHeader()
      )
      user.setUserInfo({ headerTheme: newTheme })
    })
  }
}

export default new Me()
