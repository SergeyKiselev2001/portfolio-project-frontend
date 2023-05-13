import { Link } from 'react-router-dom'
import classes from './Header.module.scss'
import { RouterPaths } from '@app/config/router'

interface IOneLink {
  link: RouterPaths
  text: string
}

const OneLink = (props: IOneLink) => {
  const { link, text } = props

  return (
    <div className={classes.OneLink}>
      <Link to={link}>{text}</Link>
    </div>
  )
}

export default OneLink
