import { useState } from 'react'
import { useThrottle } from './useThrottle'
import SmoothScroll from 'smooth-scroll'

export const useToggleScroll = () => {
  const [lastValue, setLastValue] = useState(0)

  const scroll = new SmoothScroll(undefined, { speed: 200 })

  const toggleScrollHandle = async () => {
    if (window.scrollY == 0) {
      scroll.animateScroll(lastValue)
      setLastValue(0)
    } else {
      setLastValue(window.scrollY)
      scroll.animateScroll(0)
    }
  }

  const { perform } = useThrottle(toggleScrollHandle, 300, true)

  return { toggleScroll: perform }
}
