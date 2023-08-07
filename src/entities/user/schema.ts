import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

export interface IUserState {
  subscribed?: boolean
  login?: string
  status?: string
  subscriptions?: {
    users: string[]
    tags: i18Tags[]
  }
  headerTheme?: HeaderTheme
  systemRole?: SystemRoles
  avatar?: {
    src: string
    alt: string
  }
}

export enum HeaderTheme {
  DEFAULT = 'Default',
  GOLD = 'Gold',
  AQUA = 'Aqua',
  GREEN = 'Green',
  DARK_BLUE = 'Dark_blue',
  ORANGE = 'Orange',
}

export enum SystemRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
