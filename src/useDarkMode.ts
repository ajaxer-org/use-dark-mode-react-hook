import { useState, useEffect } from 'react'

export default function useDarkMode(): [boolean, (value: boolean) => void] {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode')
    return storedMode !== null
      ? JSON.parse(storedMode)
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  return [darkMode, setDarkMode]
}

