import { createContext } from 'react'

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

interface IThemeContext {
  mode: Theme
  toggleTheme: VoidFunction
}

export const ThemeContext = createContext({} as unknown as IThemeContext)
