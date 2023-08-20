import { useState, useEffect } from 'react'
import classes from './PostEditor.module.scss'
import { clsx } from '@shared/utils'

interface IImageEditor {
  id: number
  src: string
  changeLink: (key: number, newValue: string) => void
  removeBlock: (key: number) => void
}

const ImageEditor = (props: IImageEditor) => {
  const { id, src, changeLink, removeBlock } = props
  const [currentSrc, setCurrentSrc] = useState(src)
  const [loadingError, setLoadingError] = useState(true)
  const [isPending, setIsPending] = useState(false)

  const onChangeHandle = (e: InputChange) => {
    setCurrentSrc(e.target.value)
    changeLink(id, e.target.value)
  }

  const removeBlockHandle = () => {
    removeBlock(id)
  }

  useEffect(() => {
    setIsPending(true)
    loadingErrorHandle(false)
  }, [currentSrc])

  const loadingErrorHandle = (value: boolean) => {
    setTimeout(() => {
      setIsPending(false)
    }, 1000)

    setLoadingError(value)
  }

  return (
    <div className={classes.ImageEditor}>
      <span className={classes.link}>Ссылка на изображение</span>
      <div className={classes.block}>
        <input
          className={classes.input}
          type="text"
          value={currentSrc}
          onChange={onChangeHandle}
          placeholder="example.com/picture.png"
        />
        <button className={classes.removeBlock} onClick={removeBlockHandle} />
      </div>
      <div
        className={clsx(
          {
            [classes.imageNotFound]: loadingError || src.length == 0,
            [classes.imagePending]: isPending && src.length > 0,
          },
          classes.imageExample
        )}
      >
        {isPending && src.length > 0 ? (
          <span>Загрузка...</span>
        ) : (
          <img
            onError={() => loadingErrorHandle(true)}
            src={currentSrc}
            alt=""
          />
        )}
        {(loadingError || src.length == 0) && (
          <span>Изображение не найдено</span>
        )}
      </div>
    </div>
  )
}

export default ImageEditor
