import { useState } from 'react'
import Filter from './ui/Filter.jsx'
import CO2 from './pages/CO2.jsx'
import Temperature from './pages/Temperature.jsx'
import SeaLevel from './pages/SeaLevels.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TemperatureMap from './pages/TemperatureMap.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TemperatureMap />
    </>
  )
}

export default App
