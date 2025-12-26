import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="text-4xl font-bold text-gray-800 shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-900">
          Climate Dashboard
        </Link>

        <div className="flex gap-8">
          <Link to="/sealevel" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">
            Sea Levels
          </Link>
          <Link to="/co2" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">
            CO₂
          </Link>
          <Link to="/temperature" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">
            Temperature
          </Link>
          <Link to="/temperature-map" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">
            Temperature Map
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar