import { useState } from 'react'
import Filter from './ui/Filter.jsx'
import CO2 from './pages/CO2.jsx'
import Temperature from './pages/Temperature.jsx'
import SeaLevel from './pages/SeaLevels.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CO2></CO2>
    <Temperature></Temperature>
    <SeaLevel></SeaLevel>
    </>
  )
}

export default App
