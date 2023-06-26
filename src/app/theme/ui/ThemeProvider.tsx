import { useState, useEffect } from 'react'
import { Theme, ThemeContext } from '../context'
import { StorageKeys, getStorageItem, setStorageItem } from '@entities/clientStorage'

interface IThemeProvider {
  children: JSX.Element
}

const ThemeProvider = ({ children }: IThemeProvider) => {
  const [theme, setTheme] = useState(Theme.DARK)

  const toggleTheme = () => {
    const newTheme = theme == Theme.DARK ? Theme.LIGHT : Theme.DARK
    setStorageItem(StorageKeys.THEME, newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    setTheme(getStorageItem(StorageKeys.THEME))
  }, [])

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
