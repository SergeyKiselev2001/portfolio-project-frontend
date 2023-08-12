import { makeAutoObservable } from 'mobx'
import { ITagsPage, TagInfo } from './schema'
import { api } from '@app/api'
import { getApiHeader, tryRequest } from '@shared/utils'
import { me } from '@entities/me'
import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'

class TagsPage implements ITagsPage {
  tags = [] as TagInfo[]

  constructor() {
    makeAutoObservable(this)
  }

  async toggleSubscription(type: i18Tags) {
    const currentTags = [...this.tags]

    const newValue = !currentTags.find((tag) => tag.type == type)?.status
      .isSubscribed

    currentTags.map((tag) => {
      if (tag.type == type) {
        tag.status.isSubscribed = newValue
      }

      return tag
    })

    this.tags = currentTags

    await tryRequest(async () => {
      await api.post(
        `/users/${me.id}`,
        { tagSubscription: { type, newValue } },
        getApiHeader()
      )
    })
  }

  async toggleBlock(type: i18Tags) {
    const currentTags = [...this.tags]

    const newValue = !currentTags.find((tag) => tag.type == type)?.status
      .isBlocked

    currentTags.map((tag) => {
      if (tag.type == type) {
        tag.status.isBlocked = newValue
      }

      return tag
    })

    this.tags = currentTags

    await tryRequest(async () => {
      await api.post(
        `/users/${me.id}`,
        { tagBlocks: { type, newValue } },
        getApiHeader()
      )
    })
  }

  async loadTags() {
    await tryRequest(async () => {
      const token = getStorageItem(StorageKeys.AUTH)

      const promiseTag = await (await api.get('/tags')).data
      const promiseUserInfo = token && (await api.get('/users/me', getApiHeader()))

      await Promise.all([promiseTag, promiseUserInfo]).then(([tags, data]) => {
        tags.map((tag: TagInfo) => {
          tag.status = {
            isSubscribed: !!data?.data?.subscriptions.tags.find(
              (el: i18Tags) => el == tag.type
            ),
            isBlocked: !!data?.data?.ignoreList.tags.find(
              (el: i18Tags) => el == tag.type
            ),
          }
        })

        data && me.setUserInfo(data.data)
        this.tags = tags as TagInfo[]
      })
    })
  }
}

export default new TagsPage()
