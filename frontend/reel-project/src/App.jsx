import './App.css'
import './styles/global.css'
import AppRoutes from './routes/AppRoutes'
import ThemeToggle from './components/ThemeToggle'

function App() {

  return (
    <>
      <ThemeToggle />
      <AppRoutes />
    </>
  )
}

export default App
