import { useState, useEffect, MutableRefObject } from 'react'

export const useIntersection = (
  element: MutableRefObject<HTMLDivElement>,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting)
      },
      { rootMargin }
    )

    element.current && observer.observe(element.current)

    return () => {
      try {
        observer.unobserve(element.current)
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  return isVisible
}
