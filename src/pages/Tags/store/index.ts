import { makeAutoObservable } from 'mobx'
import { ITagsPage, TagInfo } from './schema'
import { api } from '@app/api'
import { tryRequest } from '@shared/utils'
import { me } from '@entities/me'

class TagsPage implements ITagsPage {
  tags = [] as TagInfo[]

  constructor() {
    makeAutoObservable(this)
  }

  async loadTags() {
    await tryRequest(async () => {
      const tags = (await (await api.get('/tags')).data) as TagInfo[]

      tags.map(
        (tag) =>
          (tag.status = {
            isSubscribed: !!me.subscriptions.tags.find((el) => el == tag.type),
            isBlocked: !!me.ignoreList.tags.find((el) => el == tag.type),
          })
      )

      this.tags = tags
    })
  }
}

export default new TagsPage()
