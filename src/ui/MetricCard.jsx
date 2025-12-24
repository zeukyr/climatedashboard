const MetricCard = ({title, number, unit, full_unit}) => {
  return (
    <div>
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{ title }</h3>
            <p className="text-4xl font-bold text-orange-600 mt-2">
              {number} <span className="text-xl"> {unit} </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">{full_unit}</p>
          </div>
    </div>
  )
}

export default MetricCard
