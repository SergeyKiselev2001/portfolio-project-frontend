import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

export interface IUserState {
  id?: number
  login?: string
  followers?: number[] | []
  followersAmount?: number
  subscriptions?: {
    users: number[]
    tags: i18Tags[]
  }
  ignoreList?: {
    tags: i18Tags[]
  }
  systemRole?: SystemRoles
  newNotifications?: boolean
  avatar?: {
    src: string
    alt: string
  }
}

export enum SystemRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
