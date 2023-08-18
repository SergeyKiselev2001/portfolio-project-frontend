import { useState } from 'react'
import classes from './PostEditor.module.scss'
import { CreatePostDto, IContent } from '../shema'
import { toast } from 'react-toastify'
import { ContentType } from '@entities/Post/ui/schema'
import { i18Tags } from '@widgets/LangSwitcher/types/i18Keys'
import { clsx } from '@shared/utils'
import TextEditor from './TextEditor'
import ImageEditor from './ImageEditor'
import QuotesEditor from './QuotesEditor'
import {
  StorageKeys,
  getStorageItem,
  setStorageItem,
} from '@entities/clientStorage'
import { useDebounce } from '@shared/hooks'

interface IPostEditor {
  publishPost: (arg: CreatePostDto) => void
}

const PostEditor = (props: IPostEditor) => {
  const { publishPost } = props
  const [title, setTitle] = useState(getStorageItem(StorageKeys.POST_TITLE))
  const [content, setContent] = useState<IContent[]>(
    getStorageItem(StorageKeys.POST_CONTENT)
  )

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
    if (!isPostValid()) return
    publishPost({ title, content, tags })
  }

  const updateContent = useDebounce(500)
  const updateTitle = useDebounce(500)

  const updateLocalStorage = async (newContent: IContent[]) => {
    updateContent(() => {
      setStorageItem(StorageKeys.POST_CONTENT, newContent)
    })
  }

  const changeTitle = (e: InputChange) => {
    setTitle(e.target.value)
    updateTitle(() => {
      setStorageItem(StorageKeys.POST_TITLE, e.target.value)
    })
  }

  const changeTextHandle = (key: number, newValue: string) => {
    const newContent = content.map((block, id) => {
      return id == key ? { ...block, text: newValue } : block
    })
    setContent(newContent)
    updateLocalStorage(newContent)
  }

  const changeQuotesHandle = (key: number, newValue: string) => {
    const newContent = content.map((block, id) => {
      return id == key ? { ...block, text: newValue } : block
    })

    setContent(newContent)
    updateLocalStorage(newContent)
  }

  const addTextEditorHandle = () => {
    const newContent = [...content, { type: ContentType.TEXT, text: '' }]
    setContent(newContent)
    updateLocalStorage(newContent)
  }

  const addQuotesEditorHandle = () => {
    const newContent = [...content, { type: ContentType.QUOTE, text: '' }]
    setContent(newContent)
    updateLocalStorage(newContent)
  }

  const addImageEditorHandle = () => {
    const newContent = [
      ...content,
      { type: ContentType.IMAGE, image: { alt: '', src: '' } },
    ]
    setContent(newContent)
    updateLocalStorage(newContent)
  }

  const removeBlockHandle = (key: number) => {
    const newContent = content.filter((block, id) => id != key)
    setContent(newContent)
    updateLocalStorage(newContent)
  }

  const changeLinkHandle = (key: number, newLink: string) => {
    const newContent = content.map((block, id) => {
      return id == key ? { ...block, image: { alt: '', src: newLink } } : block
    })
    setContent(newContent)
    updateLocalStorage(newContent)
  }

  return (
    <div className={classes.PostEditor}>
      <span className={classes.postBuilder}>Конструктор поста</span>

      <div className={classes.postTitleBlock}>
        <span className={classes.label}>Заголовок поста</span>
        <input
          className={classes.titleInput}
          type="text"
          onChange={changeTitle}
          value={title}
          placeholder="Введите название"
        />
      </div>

      {content.length > 0 && (
        <div className={classes.content}>
          {content.map((block, id) => {
            switch (block.type) {
              case ContentType.TEXT:
                return (
                  <TextEditor
                    id={id}
                    key={id}
                    text={block.text as string}
                    removeBlock={removeBlockHandle}
                    changeText={changeTextHandle}
                  />
                )
              case ContentType.QUOTE:
                return (
                  <QuotesEditor
                    id={id}
                    key={id}
                    text={block.text as string}
                    removeBlock={removeBlockHandle}
                    changeQuotes={changeQuotesHandle}
                  />
                )
              case ContentType.IMAGE:
                return (
                  <ImageEditor
                    id={id}
                    key={id}
                    removeBlock={removeBlockHandle}
                    src={block.image?.src as string}
                    changeLink={changeLinkHandle}
                  />
                )
            }
          })}
        </div>
      )}

      <div className={classes.addContentBlock}>
        <span className={classes.addContentTitle}>Добавить:</span>

        <button
          onClick={addTextEditorHandle}
          className={clsx([classes.contentButton, classes.buttonText])}
        />
        <button
          onClick={addImageEditorHandle}
          className={clsx([classes.contentButton, classes.buttonImage])}
        />
        <button
          onClick={addQuotesEditorHandle}
          className={clsx([classes.contentButton, classes.buttonQuotes])}
        />
      </div>

      <button onClick={publishPostHandle}>PUBLISH POST</button>
    </div>
  )
}

export default PostEditor
