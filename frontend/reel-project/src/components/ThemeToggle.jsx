import React, {useEffect, useState} from 'react'
import '../styles/global.css'

export default function ThemeToggle(){
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } catch(e){ return 'light' }
  })

  useEffect(()=>{
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } catch(e){}
  },[theme])

  const toggle = ()=> setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <button
      aria-label="Toggle color theme"
      onClick={toggle}
      className="theme-toggle"
      style={{position:'fixed', right:16, top:16, zIndex:9999}}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
