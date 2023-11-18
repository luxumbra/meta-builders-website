import { useContext } from 'react'

import { ThemeContext } from '~mb/contexts'



export type UseDarkModeType = {
  isDarkMode: boolean
  theme: string
  toggleTheme: () => void
}

/**
 * Dark Mode Toggle
 *
 * Allows the user to toggle the light/dark mode of the website.
 *
 */
export function useDarkMode(): UseDarkModeType {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const isDarkMode = theme === 'dark'

  return { isDarkMode, theme, toggleTheme }
}
export default useDarkMode;