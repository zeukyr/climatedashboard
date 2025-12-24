function DateRangeFilter({ startYear, endYear, onStartChange, onEndChange, minYear, maxYear }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Date Range</h3>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Start Year</label>
            <input
              type="number"
              value={startYear}
              onChange={(e) => onStartChange(parseInt(e.target.value))}
              min={minYear}
              max={endYear}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">End Year</label>
            <input
              type="number"
              value={endYear}
              onChange={(e) => onEndChange(parseInt(e.target.value))}
              min={startYear}
              max={maxYear}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {
              onStartChange(minYear);
              onEndChange(maxYear);
            }}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition mt-5"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
  
  export default DateRangeFilter;