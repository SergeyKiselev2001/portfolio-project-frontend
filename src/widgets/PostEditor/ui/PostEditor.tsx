import { useState } from 'react'
import classes from './PostEditor.module.scss'
import { CreatePostDto } from '../shema'
import { toast } from 'react-toastify'
import { ContentType } from '@entities/Post/ui/schema'
import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'

interface IPostEditor {
  publishPost: (arg: CreatePostDto) => void
}

const PostEditor = (props: IPostEditor) => {
  const { publishPost } = props
  const [title, setTitle] = useState('')
  const [content, setContent] = useState([
    {
      type: ContentType.TEXT,
      text: 'hehehehhehe',
    },
  ])

  const [tags, setTags] = useState([] as i18Tags[])

  const isPostValid = () => {
    if (title.length < 4) {
      toast.error('Длина заголовка должна быть более 4 символов')
      return false
    }

    if (content.length < 1) {
      toast.error('Нельзя опубликовать пустой пост')
      return false
    }

    return true
  }

  const publishPostHandle = () => {
    isPostValid() &&
      publishPost({
        title,
        content,
        tags,
      })
  }

  const changeTitle = (e: InputChange) => {
    setTitle(e.target.value)
  }

  return (
    <div className={classes.PostEditor}>
      <input
        type="text"
        onChange={changeTitle}
        value={title}
        placeholder="Заголовок..."
      />

      <button onClick={publishPostHandle}>PUBLISH POST</button>
    </div>
  )
}

export default PostEditor
