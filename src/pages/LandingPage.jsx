import { TrendingUp, Droplets, Thermometer, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Climate Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore climate data from trusted sources like NASA, NOAA, and EUMETSAT. 
            Track changes in temperature, CO₂ levels, and sea levels over time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <a 
            href="/temperature" 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <Thermometer className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Temperature Anomaly</h3>
            <p className="text-gray-600 mb-4">
              Track global temperature changes relative to the 1951-1980 baseline period from NASA GISTEMP data.
            </p>
            <span className="text-orange-600 font-semibold group-hover:underline">
              Explore Temperature Data →
            </span>
          </a>

          <a 
            href="/co2" 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">CO₂ Levels</h3>
            <p className="text-gray-600 mb-4">
              Monitor atmospheric carbon dioxide concentrations measured at Mauna Loa Observatory.
            </p>
            <span className="text-green-600 font-semibold group-hover:underline">
              Explore CO₂ Data →
            </span>
          </a>

          <a 
            href="/sealevel" 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Sea Levels</h3>
            <p className="text-gray-600 mb-4">
              View global mean sea level rise data from satellite measurements by NOAA and international partners.
            </p>
            <span className="text-blue-600 font-semibold group-hover:underline">
              Explore Sea Level Data →
            </span>
          </a>
        </div>

        <div className="bg-gray-900 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Understanding Climate Change</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">+1.1°C</div>
              <p className="text-gray-300">Global temperature increase since pre-industrial times</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">420+ ppm</div>
              <p className="text-gray-300">Current atmospheric CO₂ concentration</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">100+ mm</div>
              <p className="text-gray-300">Sea level rise since 1993</p>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8">
            Data is from authoritative scientific sources. Last updated Dec. 2025.
          </p>
        </div>
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Exploring Climate Data
          </h2>
          <p className="text-gray-600 mb-8">
            Use interactive charts and filters to dive deep into climate trends
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/temperature-map" 
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              View Timelapse of Temperature Map
            </a>
            <a 
              href="/co2" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Browse CO2 Metrics in Detail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;