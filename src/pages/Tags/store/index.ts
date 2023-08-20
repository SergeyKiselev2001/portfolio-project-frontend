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

  async unsubscribeFromTag(type: i18Tags) {
    const currentTags = [...this.tags]

    this.tags = currentTags.map((tag) => {
      if (tag.type == type) {
        return {
          ...tag,
          status: {
            ...tag.status,
            isSubscribed: false,
          },
        }
      }

      return tag
    })

    await tryRequest(async () => {
      await api.post(`/tags/unsubscribe`, { type }, getApiHeader())
    })
  }

  async subscribeOnTag(type: i18Tags) {
    const currentTags = [...this.tags]

    this.tags = currentTags.map((tag) => {
      if (tag.type == type) {
        return {
          ...tag,
          status: {
            isBlocked: false,
            isSubscribed: true,
          },
        }
      }

      return tag
    })

    await tryRequest(async () => {
      await api.post(`/tags/subscribe`, { type }, getApiHeader())
    })
  }

  async blockTag(type: i18Tags) {
    const currentTags = [...this.tags]

    this.tags = currentTags.map((tag) => {
      if (tag.type == type) {
        return {
          ...tag,
          status: {
            isBlocked: true,
            isSubscribed: false,
          },
        }
      }

      return tag
    })

    await tryRequest(async () => {
      await api.post(`/tags/block`, { type }, getApiHeader())
    })
  }

  async unblockTag(type: i18Tags) {
    const currentTags = [...this.tags]

    this.tags = currentTags.map((tag) => {
      if (tag.type == type) {
        return {
          ...tag,
          status: {
            ...tag.status,
            isBlocked: false,
          },
        }
      }

      return tag
    })

    await tryRequest(async () => {
      await api.post(`/tags/unblock`, { type }, getApiHeader())
    })
  }

  async loadTags() {
    await tryRequest(async () => {
      const token = getStorageItem(StorageKeys.AUTH)

      const promiseTag = await (await api.get('/tags')).data
      const promiseUserInfo =
        token && (await api.get('/users/me', getApiHeader()))

      me.setIsDataLoaded(true)

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
