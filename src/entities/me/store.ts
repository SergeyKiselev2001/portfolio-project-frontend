import { makeAutoObservable } from 'mobx'
import { IMeState } from './schema'
import { getApiHeader, tryRequest } from '@shared/utils'
import { api } from '@app/api'
import { HeaderTheme, SystemRoles, user } from '@entities/user'
import { StorageKeys } from '@entities/clientStorage'

class Me implements IMeState {
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
  systemRole = SystemRoles.USER
  avatar = {
    src: '',
    alt: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfoByJWT = async () => {
    await tryRequest(async () => {
      if (
        localStorage.getItem(StorageKeys.AUTH) ||
        sessionStorage.getItem(StorageKeys.AUTH)
      ) {
        const data = await api.get('/users/me', getApiHeader())

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
      await api.post(`/users/${this.id}`, { newStatus }, getApiHeader())
      user.setUserInfo({
        status: newStatus,
      })
    })
  }

  updateTheme = async (headerTheme: HeaderTheme) => {
    await tryRequest(async () => {
      await api.post(`/users/${this.id}`, { headerTheme }, getApiHeader())
      user.setUserInfo({ headerTheme })
    })
  }

  savePost = async (postId: number) => {
    await tryRequest(async () => {
      await api.post(`/users/${this.id}`, { savePost: postId }, getApiHeader())
    })
  }

  removeFromSaved = async (postId: number) => {
    await tryRequest(async () => {
      await api.post(
        `/users/${this.id}`,
        { removeFromSaved: postId },
        getApiHeader()
      )
    })
  }
}

export default new Me()
