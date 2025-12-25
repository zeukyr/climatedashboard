
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import MetricCard from '../ui/MetricCard';
import LineChartComponent from '../ui/LineChartComponent';
import DateRangeFilter from '../ui/Filter';

const Temperature = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const {data: temperatureData, error } = await supabase
            .from('temperature_data')
            .select('temperature_anomaly, year')
            .order('year', { ascending: true });
            if (error) {
                console.error('Error fetching Temperature data:', error);
            } else {
                setData(temperatureData);
                if (temperatureData.length > 0 && !startYear && !endYear) {
                    setStartYear(Math.floor(temperatureData[0].year));
                    setEndYear(Math.floor(temperatureData[temperatureData.length - 1].year));

            }
            setLoading(false)
        }
    }

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter(row => row.year >= startYear && row.year <= endYear);
        setFilteredData(filtered); }, [startYear, endYear, data]);

    const latestValue = filteredData[filteredData.length - 1]?.temperature_anomaly;
    const earliestValue = filteredData[0]?.temperature_anomaly;
    const change = latestValue - earliestValue;
    const percentChange = ((change / earliestValue) * 100).toFixed(2);
    const direction = change >= 0 ? "increasing" : "decreasing"
    

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
      }
    
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Global Land-Ocean Temperature Index</h1>
            <p className="
            text-gray-600 mt-2">Data from NASA GISTEMP</p>
          </div>

          <DateRangeFilter
                startYear={startYear}
                endYear={endYear}
                onStartChange={setStartYear}
                onEndChange={setEndYear}
                minYear={data[0]?.year || 1958}
                maxYear={data[data.length - 1]?.year || 2025}
      />

          <MetricCard
                title="Current Temperature Anomaly"
                number={data[data.length - 1]?.temperature_anomaly.toFixed(2)}
                unit="°C"
                full_unit="Degrees Celsius"
            />
            
            <MetricCard
                title={`Change in Temperature Anomaly from ${startYear} to ${endYear}`}
                number={percentChange}
                unit="%"
                full_unit={`Or ${direction} by ${change.toFixed(2)} Celsius`}
            />

    
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Temperature Anomaly Over Time in 0.01 Degrees Celsius (Base Period 1951-1980)
            </h2>
            <LineChartComponent
             data={filteredData} 
             title="Temperature Anomaly (0.01 °C)"
             xKey="year"
             yKey="temperature_anomaly"
             unit="0.01 °C"
            />
          </div>
        </div>
      );
    }
    
export default Temperature;
    