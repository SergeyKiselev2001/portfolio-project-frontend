import { makeAutoObservable } from 'mobx'
import { IComment, ICommentsState } from './schema'
import { getApiHeader, tryRequest, urlConverter } from '@shared/utils'
import { api } from '@app/api'
import { QueryParamsObj } from '@entities/Post'
import { QueryParams } from '@app/config/router'
import { toast } from 'react-toastify'

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

      this.amountOfComments = result.headers['x-total-count']

      this.comments = result.data
    })
  }

  getRestComments = async (query: QueryParamsObj[]) => {
    await tryRequest(async () => {
      query = [
        ...query,
        [QueryParams.START, `${this.limit}`],
        [QueryParams.END, `${this.amountOfComments}`],
      ]

      const result = (await api.get(urlConverter('/comments', query))) as {
        data: IComment[]
      }

      this.comments = [...this.comments, ...result.data]
    })
  }

  sendComment = async (comment: Omit<IComment, 'id'>) => {
    await tryRequest(
      async () => {
        await api.post('/comments', comment, getApiHeader())
        await api.post(
          `/posts/${comment.post_id}`,
          { incrementCommentsCounter: true },
          getApiHeader()
        )
        this.amountOfComments = +this.amountOfComments + 1
        toast.success('Комментарий добавлен')
      },
      () => {
        toast.error('Произошла ошибка на сервере, попробуйте еще раз')
      }
    )
  }
}

export default new Comments()
