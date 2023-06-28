import { useTranslation } from 'react-i18next'
import classes from './Spinner.module.scss'
import { i18Keys } from '@widgets/LangSwitcher'

interface ISpinner {
  size?: number
}

const Spinner = (props: ISpinner) => {
  const { size } = props
  const { t } = useTranslation()

  return <div className={classes.Spinner}> {t(i18Keys.WAIT)}...</div>
}

export default Spinner
