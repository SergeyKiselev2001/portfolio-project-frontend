import { makeAutoObservable } from 'mobx'
import { IAuthorizationState, IFetchTokenDto } from './schema'
import { api } from '@app/api'
import { toast } from 'react-toastify'
import { StorageKeys } from '../clientStorage'
import { me } from '@entities/me'

class Authorization implements IAuthorizationState {
  auth = { token: '', refresh_token: '' }

  constructor() {
    makeAutoObservable(this)
  }

  async fetchToken({ login, password, rememberMe }: IFetchTokenDto) {
    try {
      const { data } = await api.post(
        '/login',
        {
          login,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      toast.success('Вход выполнен', { icon: '😎' })

      me.setUserInfo({ ...data.userInfo, login })

      if (rememberMe) {
        localStorage.setItem(StorageKeys.AUTH, JSON.stringify(data))
      } else {
        localStorage.removeItem(StorageKeys.AUTH)
        sessionStorage.setItem(StorageKeys.AUTH, JSON.stringify(data))
      }

      return data
    } catch (e) {
      toast.error('Неверный логин или пароль', { icon: '😳' })
    }
  }
}

export default new Authorization()
