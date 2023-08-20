import { useEffect, useRef, MutableRefObject } from 'react'
export const useDebounce = (delay: number) => {
  const timerRef = useRef() as MutableRefObject<VoidFunction | number>

  useEffect(() => {
    const newCallback = timerRef.current
    clearTimeout(timerRef.current as number)

    const newTimer = setTimeout(() => {
      typeof newCallback == 'function' && newCallback()
    }, delay)

    return () => {
      clearTimeout(newTimer)
    }
  }, [timerRef.current])

  return (callback: VoidFunction) => {
    timerRef.current = callback
  }
}
