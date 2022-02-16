import {useContext} from 'react'
import {ThemeContext as StyledThemeContext} from 'styled-components'
import {useThemeManager} from 'state/user/hooks'

const useTheme = () => {
  const [isDark, toggleTheme] = useThemeManager()
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  const theme = useContext(StyledThemeContext)
  return {isDark, theme, toggleTheme}
}

export default useTheme
