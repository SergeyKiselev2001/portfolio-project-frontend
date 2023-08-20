import { IUserState } from '@entities/user'
import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

export interface IMeState extends IUserState {
  id?: number
  ignoreList?: {
    tags: i18Tags[]
  }
  followersAmount?: number
  newNotifications?: boolean
}
