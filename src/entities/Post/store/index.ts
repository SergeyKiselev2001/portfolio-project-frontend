import { makeAutoObservable } from 'mobx'
import { IPosts, QueryParamsObj } from './schema'
import { api } from '@app/api'
import { INewPost } from '../ui/schema'
import { getApiHeader, sleep, tryRequest, urlConverter } from '@shared/utils'
import { toast } from 'react-toastify'
import { QueryParams } from '@app/config/router'
import { CreatePostDto } from '@widgets/PostEditor'
import { comments } from '@entities/Comments'
import classes from '../ui/Post.module.scss'

class Post implements IPosts {
  posts = [] as INewPost[]
  currentPage = 1
  amountOfPages = 1
  limit = 2

  constructor() {
    makeAutoObservable(this)
  }

  async getPostById(id: string) {
    await tryRequest(async () => {
      const result = (await api.get(`/posts/${id}`, getApiHeader())) as {
        data: INewPost
      }

      this.posts = [result.data]
    })
  }

  async getPosts(query: QueryParamsObj[]) {
    await tryRequest(async () => {
      query = [...query, [QueryParams.LIMIT, `${this.limit}`]]
      await sleep(500)

      const result = (await api.get(
        urlConverter('/posts', query),
        getApiHeader()
      )) as {
        data: INewPost[]
        headers: {
          'x-total-count': number
        }
      }

      this.amountOfPages = Math.ceil(
        result.headers['x-total-count'] / this.limit
      )

      this.posts = result.data
    })
  }

  resetCurrentPage = () => {
    this.currentPage = 1
    this.posts = []
  }

  async getNextPosts(query: QueryParamsObj[]) {
    if (this.currentPage >= this.amountOfPages) {
      return
    }

    this.currentPage += 1
    await tryRequest(async () => {
      query = [
        ...query,
        [QueryParams.LIMIT, `${this.limit}`],
        [QueryParams.PAGE, `${this.currentPage}`],
      ]

      const { data } = (await api.get(
        urlConverter('/posts', query),
        getApiHeader()
      )) as {
        data: INewPost[]
      }

      this.posts = [...this.posts, ...data]
    })
  }

  hidePost(hideId: number) {
    const post = document.getElementById(`post-${hideId}`)
    ;(post as HTMLElement).classList.add(classes.slow_disappearing)
    setTimeout(() => {
      this.posts = this.posts.filter(({ id }) => hideId != id)
    }, 500)
  }

  async sendReport(post_id: number) {
    await tryRequest(async () => {
      await api.post('/reports', { post_id }, getApiHeader())
      toast.success('Пост отправлен на модерацию')
    })
  }

  async deletePost(postId: number) {
    await tryRequest(async () => {
      await api.delete(`/posts/${postId}`, getApiHeader())
      toast.success('Пост удалён!')
    })

    this.hidePost(postId)
  }

  async publishPost(post: CreatePostDto, onCreate: (arg: string) => void) {
    await tryRequest(async () => {
      const { data } = await api.post(`/posts/create`, post, getApiHeader())

      this.posts = []
      comments.comments = []
      comments.amountOfComments = 0
      onCreate(data.id)
    })
  }

  async likePost(postId: number) {
    await tryRequest(async () => {
      await api.post(`/posts/${postId}/like`, {}, getApiHeader())
    })
  }

  async removeLike(postId: number) {
    await tryRequest(async () => {
      await api.delete(`/posts/${postId}/dislike`, getApiHeader())
    })
  }

  savePost = async (postId: number) => {
    await tryRequest(async () => {
      await api.post(`/posts/${postId}/save`, {}, getApiHeader())
    })
  }

  removeFromSaved = async (postId: number) => {
    await tryRequest(async () => {
      await api.delete(`/posts/${postId}/unsave`, getApiHeader())
    })
  }
}

export default new Post()
