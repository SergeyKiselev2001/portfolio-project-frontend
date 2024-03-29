import { createPortal } from 'react-dom'
import classes from './Modal.module.scss'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { i18Keys } from '@widgets/LangSwitcher'

interface IModal {
  children: JSX.Element
  onclose?: VoidFunction
  showCloseButton?: boolean
  styles?: {
    width: string
    maxWidth: string
  }
}

const Modal = (props: IModal) => {
  const { children, onclose, showCloseButton, styles } = props

  const [active, setActive] = useState(true)
  const { t } = useTranslation()

  const closeModal = () => {
    setActive(false)
    onclose && onclose()
  }

  const popup = (
    <div className={classes.Modal} onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={classes.content_wrapper}
        style={{
          ...(styles?.width && { width: styles.width }),
          ...(styles?.maxWidth && { maxWidth: styles.maxWidth }),
        }}
      >
        {children}
        {showCloseButton && (
          <button className={classes.close_button} onClick={closeModal}>
            {t(i18Keys.CLOSE)}
          </button>
        )}
      </div>
    </div>
  )

  return active ? createPortal(popup, overlay) : null
}

export default Modal
