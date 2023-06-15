import { useEffect, useState } from 'react'

interface IOptions {
  addEventListener?: boolean
}

export const useScroll = (options?: IOptions) => {
  options = { ...options }

  const { addEventListener = true } = options
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    if (addEventListener) {
      const handleScroll = () => {
        setScrollTop(window.scrollY)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return { scrollTop }
}
