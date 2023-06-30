import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

export interface ITagsPage {
  tags: TagInfo[]
}

export interface TagInfo {
  type: i18Tags
  amount: number
  status: {
    isSubscribed: boolean
    isBlocked: boolean
  }
}
