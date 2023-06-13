import { LangSwitcher } from '@widgets/LangSwitcher'
import classes from './Controller.module.scss'

const Options = () => {
  const stop = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div onClick={stop} className={classes.Options}>
      <div>Очистить LocalStorage</div>
      <div>Очистить SessionStorage</div>
      <LangSwitcher />
    </div>
  )
}

export default Options
