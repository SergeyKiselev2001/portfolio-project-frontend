import { useRef } from 'react'

export const useThrottle = (
  callback: () => void,
  timeout: number,
  removeFirstDelay?: boolean
) => {
  const timer = useRef<null | NodeJS.Timeout>(null)
  const firstDelay = useRef(true)

  const perform = () => {
    if (timer.current) return

    removeFirstDelay && callback()

    timer.current = setTimeout(() => {
      !removeFirstDelay && callback()
      clearTimeout(+timer)
      timer.current = null
      firstDelay.current = false
    }, timeout)
  }

  return { perform }
}
