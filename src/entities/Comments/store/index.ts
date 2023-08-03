import { makeAutoObservable } from 'mobx'
import { IComment, ICommentToSend, ICommentsState } from './schema'
import { getApiHeader, tryRequest, urlConverter } from '@shared/utils'
import { api } from '@app/api'
import { QueryParamsObj } from '@entities/Post'
import { QueryParams } from '@app/config/router'
import { me } from '@entities/me'

class Comments implements ICommentsState {
  limit = 5
  amountOfComments = 0
  comments = [] as IComment[]

  constructor() {
    makeAutoObservable(this)
  }

  getComments = async (query: QueryParamsObj[]) => {
    await tryRequest(async () => {
      query = [...query, [QueryParams.LIMIT, `${this.limit}`]]

      const result = (await api.get(urlConverter('/comments', query))) as {
        data: IComment[]
        headers: {
          'x-total-count': number
        }
      }

      this.amountOfComments = Math.ceil(
        result.headers['x-total-count'] / this.limit
      )

      this.comments = result.data
    })
  }

  sendComment = async (comment: ICommentToSend) => {
    await tryRequest(async () => {
      const { avatar, id, login } = me
      const author = {
        name: login,
        avatar,
        id,
      }

      const myComment = {
        text: comment.text,
        post_id: comment.post_id,
        likes: 0,
        timestamp: +new Date(),
        author,
      } as Omit<IComment, 'id'>

      await api.post('/comments', myComment, getApiHeader())
      await api.post(
        `/posts/${comment.post_id}`,
        {
          incrementCommentsCounter: true,
        },
        getApiHeader()
      )
    })
  }
}

export default new Comments()
