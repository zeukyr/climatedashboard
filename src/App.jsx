import CO2 from './pages/CO2.jsx'
import Temperature from './pages/Temperature.jsx'
import SeaLevel from './pages/SeaLevels.jsx'
import './App.css'
import TemperatureMap from './pages/TemperatureMap.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/CO2" element={<CO2 />} />
            <Route path="/temperature" element={<Temperature />} />
            <Route path="/sealevel" element={<SeaLevel />} />
            <Route path="/temperature-map" element={<TemperatureMap />} />
          </Routes>
</BrowserRouter>

    </>
  )
}

export default App
