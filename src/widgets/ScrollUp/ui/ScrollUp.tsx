import { useScroll, useToggleScroll } from '@shared/hooks'
import classes from './ScrollUp.module.scss'
import { clsx } from '@shared/utils'

const ScrollUp = () => {
  const { toggleScroll } = useToggleScroll()
  const toggleScrollHandle = () => {
    toggleScroll()
  }

  const { scrollTop } = useScroll()

  return (
    <button
      onClick={toggleScrollHandle}
      className={clsx(classes.ScrollUp, {
        [classes.arrow_up]: scrollTop != 0,
        [classes.arrow_down]: scrollTop == 0,
      })}
    />
  )
}

export default ScrollUp
