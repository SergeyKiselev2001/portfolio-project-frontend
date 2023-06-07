import { createPortal } from 'react-dom'
import classes from './Modal.module.scss'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { i18Keys } from '@widgets/LangSwitcher'

interface IModal {
  children: JSX.Element
  onclose?: VoidFunction
}

const Modal = (props: IModal) => {
  const { children, onclose } = props

  const [active, setActive] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    changeBodyOverflow('hidden')
  }, [])

  const changeBodyOverflow = (overflow: string) => {
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = overflow
  }

  const closeModal = () => {
    setActive(false)
    changeBodyOverflow('auto')
    onclose && onclose()
  }

  const popup = (
    <div className={classes.Modal} onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={classes.content_wrapper}
      >
        {children}
        <button className={classes.close_button} onClick={closeModal}>
          {t(i18Keys.CLOSE)}
        </button>
      </div>
    </div>
  )

  return active ? createPortal(popup, overlay) : null
}

export default Modal
