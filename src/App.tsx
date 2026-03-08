import { useState } from 'react'
import './App.css'
import { ZportiaContext, ZportiaProvider } from './context/ZportiaContext'
import AppRouter from './router/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ZportiaProvider>
        <AppRouter></AppRouter>
      </ZportiaProvider>
    </>
  )
}

export default App
