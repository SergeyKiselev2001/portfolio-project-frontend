import { Link } from 'react-router-dom'
import classes from './Header.module.scss'
import { RouterPaths } from '@app/config/router'

interface IOneLink {
  link: RouterPaths
  text: string
  children?: JSX.Element
}

const OneLink = (props: IOneLink) => {
  const { link, text, children } = props

  return (
    <div className={classes.OneLink}>
      <Link to={link}>{text || children}</Link>
    </div>
  )
}

export default OneLink
