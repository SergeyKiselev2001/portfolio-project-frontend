import { makeAutoObservable } from 'mobx'
import { IPosts } from './schema'
import { api } from '@app/api'
import { INewPost } from '../ui/schema'
import classes from './../ui/Post.module.scss'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'
import { tryRequest } from '@shared/utils'
import { toast } from 'react-toastify'

class Post implements IPosts {
  posts = [] as INewPost[]

  constructor() {
    makeAutoObservable(this)
  }

  async getPosts() {
    try {
      const { data } = await api.get('/posts')
      this.posts = data
    } catch (e) {
      console.log(e)
    }
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
}

export default new Post()
