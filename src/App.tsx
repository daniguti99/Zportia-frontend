import './App.css'
import { ZportiaProvider } from './context/ZportiaContext'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <>
      <ZportiaProvider>
        <AppRouter></AppRouter>
      </ZportiaProvider>
    </>
  )
}

export default App
