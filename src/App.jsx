import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DonationAppJsx } from './components/donation-app'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DonationAppJsx />
    </>
  )
}

export default App
