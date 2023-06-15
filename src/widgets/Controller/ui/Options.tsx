import { LangSwitcher, i18Keys } from '@widgets/LangSwitcher'
import classes from './Controller.module.scss'
import { clearLocalStorage, clearSessionStorage } from '@entities/clientStorage'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const Options = () => {
  const [lsCleared, setLsCleared] = useState(false)
  const [ssCleared, setSsCleared] = useState(false)
  const { t } = useTranslation()

  const stop = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const clearLS = () => {
    clearLocalStorage()
    setLsCleared(true)
    toast.info(t(i18Keys.REFRESH_PAGE))
  }

  const clearSS = () => {
    clearSessionStorage()
    setSsCleared(true)
    toast.info(t(i18Keys.REFRESH_PAGE))
  }

  return (
    <div onClick={stop} className={classes.Options}>
      <div className={classes.lang}>
        <LangSwitcher />
      </div>

      <button
        className={lsCleared ? classes.cleared : ''}
        disabled={lsCleared}
        onClick={clearLS}
      >
        Очистить LocalStorage
      </button>
      <button
        className={ssCleared ? classes.cleared : ''}
        disabled={ssCleared}
        onClick={clearSS}
      >
        Очистить SessionStorage
      </button>
    </div>
  )
}

export default Options
