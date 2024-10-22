'use client'

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'

import { applyTheme } from '@/helpers/theme.helpers'

import { baseTheme, darkTheme } from '@/constants'

export interface ThemeContextType {
  currentTheme: 'light' | 'dark'
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a CustomThemeProvider')
  }
  return context
}

interface CustomThemeProviderProps {
  children: ReactNode
}

export default function CustomThemeProvider({
  children,
}: CustomThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  )

  const toggleTheme = () => {
    const mode = currentTheme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', mode)
    setCurrentTheme(mode)
  }

  useEffect(() => {
    applyTheme(currentTheme === 'light' ? baseTheme : darkTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
