import { makeAutoObservable } from 'mobx'
import { IPosts, QueryParamsObj } from './schema'
import { api } from '@app/api'
import { INewPost } from '../ui/schema'
import classes from './../ui/Post.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { tryRequest, urlConverter } from '@shared/utils'
import { toast } from 'react-toastify'

class Post implements IPosts {
  posts = [] as INewPost[]

  constructor() {
    makeAutoObservable(this)
  }

  async getPosts(query: QueryParamsObj[]) {
    tryRequest(async () => {
      const { data } = (await api.get(urlConverter('/posts', query))) as {
        data: INewPost[]
      }

      const hiddenPosts = getStorageItem(StorageKeys.HIDDEN_POSTS) as {
        id: number
      }[]

      const newPosts = data.filter(
        (post) => !hiddenPosts?.find((el) => el.id == post.id)
      )

      this.posts = newPosts
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
