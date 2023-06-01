import { Link } from 'react-router-dom'
import classes from './Header.module.scss'
import { RouterPaths } from '@app/config/router'

interface IOneLink {
  link: RouterPaths
  text: string
  isActive: boolean
}

const OneLink = (props: IOneLink) => {
  const { link, text, isActive } = props

  return (
    <div className={`${classes.OneLink} ${isActive ? classes.activeLink : ''}`}>
      <Link to={link}>{text}</Link>
      {isActive && <div className={classes.active} />}
    </div>
  )
}

export default OneLink
