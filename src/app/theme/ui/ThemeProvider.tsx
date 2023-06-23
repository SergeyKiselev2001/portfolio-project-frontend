import { useState, useEffect } from 'react'
import { Theme, ThemeContext } from '../context'

interface IThemeProvider {
  children: JSX.Element
}

const ThemeProvider = ({ children }: IThemeProvider) => {
  const [theme, setTheme] = useState(Theme.DARK)

  const toggleTheme = () => {
    setTheme((prev) => (prev == Theme.DARK ? Theme.LIGHT : Theme.DARK))
  }

  useEffect(() => {
    const root = document.getElementById('root')
    for (const key in Theme) {
      root?.classList.remove(key)
    }
    root?.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ mode: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
