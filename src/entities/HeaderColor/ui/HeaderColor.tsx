import { HeaderTheme } from '@entities/user'
import classes from './HeaderColor.module.scss'

interface IHeaderColor {
  color: HeaderTheme
  isChecked: boolean
  onChange: (arg: HeaderTheme) => void
}

const HeaderColor = (props: IHeaderColor) => {
  const { color, isChecked, onChange } = props

  const changeColor = () => {
    onChange(color)
  }

  return (
    <button
      onClick={changeColor}
      className={`${classes.HeaderColor} ${classes[color]}`}
    />
  )
}

export default HeaderColor
