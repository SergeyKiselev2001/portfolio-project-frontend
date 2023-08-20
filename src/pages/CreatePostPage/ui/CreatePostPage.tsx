import { HeaderPage, withHeader } from '@shared/hocs/withHeader'
import classes from './CreatePostPage.module.scss'
import { useEffect, useState } from 'react'
import { RouterPaths } from '@app/config/router'
import { me } from '@entities/me'
import { observer } from 'mobx-react-lite'
import { Spinner } from '@widgets/Spinner'
import { Login } from '@widgets/Login'
import { CreatePostDto, PostEditor } from '@widgets/PostEditor'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { posts } from '@entities/Post'
import { StorageKeys, getStorageItem } from '@entities/clientStorage'

const CreatePostPage = observer(() => {
  const [spinner, setSpinner] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!getStorageItem(StorageKeys.AUTH)) {
      me.setIsDataLoaded(true)
    }
    HeaderPage.setCurrentPage(RouterPaths.CREATE_POST)
    ;(async () => {
      await me.getUserInfoByJWT()
      setSpinner(false)
    })()
  }, [])

  const onLogin = () => {
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'
    location.reload()
  }

  const publishPost = (post: CreatePostDto) => {
    posts.publishPost(post, (id) => {
      toast.success('Пост опубликован!')
      navigate(`/post/${id}`)
    })
  }

  return (
    <div className={classes.CreatePostPage}>
      <div className={classes.wrapper}>
        {!spinner && !me.login && (
          <>
            <span className={classes.log_in}>
              Для добавления поста необходимо войти в профиль
            </span>

            <Login onLogin={onLogin} />
          </>
        )}

        {spinner && <Spinner />}

        {!spinner && me.login && (
          <div className={classes.editor}>
            <PostEditor publishPost={publishPost} />
          </div>
        )}
      </div>
    </div>
  )
})

export default withHeader(CreatePostPage)
