import { ThemeContext } from '@app/theme'
import classes from './ThemeSwitcher.module.scss'
import { useContext, useState, useEffect } from 'react'

const ThemeSwitcher = () => {
  const theme = useContext(ThemeContext)

  const toggleTheme = () => {
    theme.toggleTheme()
  }

  const [currentTheme, setTheme] = useState(theme.mode)

  useEffect(() => {
    setTheme(theme.mode)
  }, [theme.mode])

  return (
    <div className={classes.ThemeSwitcher}>
      <button className={classes[currentTheme]} onClick={toggleTheme} />
    </div>
  )
}

export default ThemeSwitcher
