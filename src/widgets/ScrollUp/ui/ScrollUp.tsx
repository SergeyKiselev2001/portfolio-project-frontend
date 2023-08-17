import { useToggleScroll } from '@shared/hooks'
import classes from './ScrollUp.module.scss'

const ScrollUp = () => {
  const { toggleScroll } = useToggleScroll()
  const toggleScrollHandle = () => {
    toggleScroll()
  }

  return <button onClick={toggleScrollHandle} className={classes.ScrollUp} />
}

export default ScrollUp
