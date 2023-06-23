import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

export interface IUserState {
  login?: string
  followers?: number[] | []
  status?: string
  followersAmount?: number
  subscriptions?: {
    users: number[]
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
