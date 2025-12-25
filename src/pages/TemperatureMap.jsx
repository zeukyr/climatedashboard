import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { scaleSequential } from "d3-scale"
import { interpolateRdYlBu } from "d3-scale-chromatic"
import { MapContainer, Popup, TileLayer, Rectangle } from "react-leaflet"
import 'leaflet/dist/leaflet.css'

const TemperatureMap = () => {
    const [year, setYear] = useState(1880)
    const [maxYear, setMaxYear] = useState(2024)
    const [minYear, setMinYear] = useState(1880)
    const [data, setData] = useState([])
    const [speed, setSpeed] = useState(1)

    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        async function fetchData() { 
            const {data: tempData, error} = await supabase
            .from("regional_temperature_data")
            .select('*')
            .order("year", {ascending: true})
            if (error) {
                console.error(error)
            } else {
                setData(tempData)
                if (tempData.length > 0) {
                    setMinYear(Number(tempData[0].year))
                    setMaxYear(Number(tempData[tempData.length - 1].year))
                    setYear(Number(tempData[0].year))
                }
            }
        }
        fetchData()
}, [])

    useEffect(() => {
        if (!playing) return;

        const interval = setInterval(() => {
            setYear(year => {
                if (year >= maxYear) {
                    setPlaying(false);
                    return maxYear;
                } 
                else { return year + 1};
            }); 
        }, 200 / speed );

        return () => clearInterval(interval); }, [playing, speed, minYear, maxYear]);
    
    const yearData = data.filter(d => Number(d.year) === year)
    const colorScale = scaleSequential(interpolateRdYlBu) .domain([2, -2]);
    
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Global Temperature Change Over Time</h1>
        <p className="text-gray-600 mt-2">
          Watch how different regions have warmed since 1880
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPlaying(!playing)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-black font-bold rounded-lg transition"
          >
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
          
          <button
            onClick={() => {setYear(minYear)
            setPlaying(false);
            }}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            ⏮ Reset
          </button>
        </div>

        <div className="flex-1">
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

        <div className="flex-1">
            Current Year: <span className="font-bold ml-2">{year}</span>
        </div>
    
    <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-600">Warmer</span>
          <div className="flex h-6 w-64">
            {[...Array(20)].map((_, i) => {
              const temp = 2 - (i / 19) * 4; 
              return (
                <div
                  key={i}
                  style={{ backgroundColor: colorScale(temp) }}
                  className="flex-1"
                />
              );
            })}
          </div>
          <span className="text-sm text-gray-600">Cooler</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>+2°C</span>
          <span>0°C</span>
          <span>-2°C</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
    <label htmlFor="speed" className="text-sm font-medium text-gray-700">
        Speed:
    </label>
    <select 
        id="speed" 
        name="speed"
        value={speed}
        onChange={(e) => setSpeed(parseFloat(e.target.value))}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
    >
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
    </select>
</div>
        <div>
        <div className="bg-white p-6 rounded-lg shadow">
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: '600px', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            opacity={0.5}
          />
          
          {yearData.map((region, idx) => (
            <Rectangle
              key={idx}
              bounds={[
                [region.lat_min, -180],
                [region.lat_max, 180]
              ]}
              pathOptions={{
                fillColor: colorScale(region.temperature_anomaly),
                fillOpacity: 0.6,
                color: '#333',
                weight: 1
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{region.region}</h3>
                  <p>Temperature Anomaly: {region.temperature_anomaly.toFixed(2)} °C</p>
                </div>
              </Popup>
            </Rectangle>
          ))}
        </MapContainer>
      </div>

    </div>
    </div>

  )

}
export default TemperatureMap
