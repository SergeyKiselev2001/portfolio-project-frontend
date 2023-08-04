import { makeAutoObservable } from 'mobx'
import { IPosts, QueryParamsObj } from './schema'
import { api } from '@app/api'
import { INewPost } from '../ui/schema'
import classes from './../ui/Post.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { getApiHeader, tryRequest, urlConverter } from '@shared/utils'
import { toast } from 'react-toastify'
import { QueryParams } from '@app/config/router'
import { CreatePostDto } from '@widgets/PostEditor'

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
      const result = (await api.get(`/posts/${id}`)) as {
        data: INewPost
      }

      this.posts = [result.data]
    })
  }

  async getPosts(query: QueryParamsObj[]) {
    await tryRequest(async () => {
      const hiddenPosts = getStorageItem(StorageKeys.HIDDEN_POSTS) as {
        id: number
      }[]

      query = [...query, [QueryParams.LIMIT, `${this.limit}`]]

      hiddenPosts?.forEach(({ id }) => {
        query.push([QueryParams.ID_NE, `${id}`])
      })

      const result = (await api.get(urlConverter('/posts', query))) as {
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
  }

  async getNextPosts(query: QueryParamsObj[]) {
    if (this.currentPage >= this.amountOfPages) {
      return
    }

    this.currentPage += 1
    await tryRequest(async () => {
      const hiddenPosts = getStorageItem(StorageKeys.HIDDEN_POSTS) as {
        id: number
      }[]

      query = [
        ...query,
        [QueryParams.LIMIT, `${this.limit}`],
        [QueryParams.PAGE, `${this.currentPage}`],
      ]

      hiddenPosts?.forEach(({ id }) => {
        query.push([QueryParams.ID_NE, `${id}`])
      })

      const { data } = (await api.get(urlConverter('/posts', query))) as {
        data: INewPost[]
      }

      const newPosts = data.filter(
        (post) => !hiddenPosts?.find((el) => el.id == post.id)
      )

      this.posts = [...this.posts, ...newPosts]
    })
  }

  hidePost(hideId: number) {
    const post = document.getElementById(`post-${hideId}`)
    ;(post as HTMLElement).classList.add(classes.slow_disappearing)
    let hiddenPosts = getStorageItem(StorageKeys.HIDDEN_POSTS)

    if (hiddenPosts) {
      hiddenPosts.push({ id: hideId })
    } else {
      hiddenPosts = [{ id: hideId }]
    }

    localStorage.setItem(StorageKeys.HIDDEN_POSTS, JSON.stringify(hiddenPosts))
    setTimeout(() => {
      this.posts = this.posts.filter(({ id }) => hideId != id)
    }, 500)
  }

  async sendReport(postId: number) {
    await tryRequest(async () => {
      const { data } = await api.post('/report', { postId })
      toast.success(data.message)
    })

    this.hidePost(postId)
  }

  async publishPost(post: CreatePostDto, onCreate: (arg: string) => void) {
    await tryRequest(async () => {
      const { data } = await api.post(
        `/posts`,
        { ...post, createPost: true },
        getApiHeader()
      )

      this.posts = []
      onCreate(data.id)
    })
  }

  async addViewCounter(postId: string) {
    await tryRequest(async () => {
      await api.post(`/posts/${postId}`, {
        addViewCounter: true,
      })
    })
  }

  async likePost(postId: number, likesAmount: number) {
    await tryRequest(async () => {
      await api.patch(`/posts/${postId}`, { isLiked: true, likesAmount })
    })
  }

  async removeLike(postId: number, likesAmount: number) {
    await tryRequest(async () => {
      await api.patch(`/posts/${postId}`, { isLiked: false, likesAmount })
    })
  }
}

export default new Post()
