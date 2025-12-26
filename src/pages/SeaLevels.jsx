
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import MetricCard from '../ui/MetricCard';
import LineChartComponent from '../ui/LineChartComponent';
import DateRangeFilter from '../ui/Filter';

const SeaLevels = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
   


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const {data: sealevelData, error } = await supabase
            .from('sea_level_data')
            .select('decimal_date, sea_level_mm')
            .order('decimal_date', { ascending: true });
            if (error) {
                console.error('Error fetching Sealevel data:', error);
            } else {
                setData(sealevelData);
                if (sealevelData.length > 0 && !startYear && !endYear) {
                    setStartYear(Math.floor(sealevelData[0].decimal_date));
                    setEndYear(Math.floor(sealevelData[sealevelData.length - 1].decimal_date));
                }
            }
            setLoading(false)
        }

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter(row => row.decimal_date >= startYear && row.decimal_date <= endYear);
        setFilteredData(filtered); }, [startYear, endYear, data]);

    const latestValue = filteredData[filteredData.length - 1]?.sea_level_mm;
    const earliestValue = filteredData[0]?.sea_level_mm;
    const change = latestValue - earliestValue;
    const percentChange = ((change / earliestValue) * 100).toFixed(2);
    const direction = change >= 0 ? "increasing" : "decreasing"


    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
      }
    
      return (
        <div className="space-y-6 p-20">
          <div>
            <h1 className="text-4xl font-bold text-gray-800"> Global Mean Sea Level</h1>
            <p className="text-gray-600 mt-2">Data from NOAA, CNES, and EUMETSAT</p>
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
                title="Current Global Mean Sea Level"
                number={data[data.length - 1]?.sea_level_mm.toFixed(2)}
                unit="mm"
                full_unit="Millimeters"
            />
            
            <MetricCard
                title={`Change in Global Mean Sea Level from ${startYear} to ${endYear}`}
                number={percentChange}
                unit="%"
                full_unit={`Or ${direction} at ${change.toFixed(2)} Mm`}
            />
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Global Mean Sea Level over Time</h2>
            <LineChartComponent
             data={filteredData} 
             title="Sea Level (mm)"
             xKey="decimal_date"
             yKey="sea_level_mm"
             unit="mm"
            />
          </div>
        </div>
      );
    }
    
export default SeaLevels;
    