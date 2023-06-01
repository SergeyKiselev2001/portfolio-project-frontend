/* eslint-disable max-len */
import { withHeader } from '@shared/hocs/withHeader'
import classes from './MainPage.module.scss'
import { Post, posts } from '@entities/Post'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { HeaderPage } from '@shared/hocs/withHeader'
import { Spinner } from '@widgets/Spinner'
import { RouterPaths } from '@app/config/router'

const MainPage = observer(() => {
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    HeaderPage.setCurrentPage(RouterPaths.MAIN)
    ;(async () => {
      await posts.getPosts()
      setSpinner(false)
    })()
  }, [])

  return (
    <div className={classes.MainPage}>
      <div className={classes.content_wrapper}>
        {spinner ? (
          <Spinner />
        ) : (
          posts.posts.map((post) => <Post key={post.id} {...post} />)
        )}
      </div>
    </div>
  )
})


export default withHeader(MainPage)
