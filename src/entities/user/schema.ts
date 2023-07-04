import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

export interface IUserState {
  subscribed?: boolean
  login?: string
  status?: string
  followersAmount?: number
  subscriptions?: {
    users: string[]
    tags: i18Tags[]
  }
  systemRole?: SystemRoles
  avatar?: {
    src: string
    alt: string
  }
}

export enum SystemRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
