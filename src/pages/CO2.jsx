
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import MetricCard from '../ui/MetricCard';
import LineChartComponent from '../ui/LineChartComponent';
import DateRangeFilter from '../ui/Filter';

const CO2 = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
   

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const {data: co2Data, error } = await supabase
            .from('co2_data')
            .select('decimal_date, co2_ppm')
            .order('decimal_date', { ascending: true });
            if (error) {
                console.error('Error fetching CO2 data:', error);
            } else {
                setData(co2Data);
                if (co2Data.length > 0 && !startYear && !endYear) {
                    setStartYear(Math.floor(co2Data[0].decimal_date));
                    setEndYear(Math.floor(co2Data[co2Data.length - 1].decimal_date));
                }
            }
            setLoading(false)
        }

        fetchData();
    }, []);
    useEffect(() => {
        const filtered = data.filter(row => row.decimal_date >= startYear && row.decimal_date <= endYear);
        setFilteredData(filtered); }, [startYear, endYear, data]);

    const latestValue = filteredData[filteredData.length - 1]?.co2_ppm;
    const earliestValue = filteredData[0]?.co2_ppm;
    const change = latestValue - earliestValue;
    const percentChange = ((change / earliestValue) * 100).toFixed(2);
    const direction = change >= 0 ? "increasing" : "decreasing"


    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
      }
    
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Atmospheric CO2 Levels</h1>
            <p className="text-gray-600 mt-2">Data from Mauna Loa Observatory, Hawaii</p>
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
                title="Current CO2 Concentration"
                number={data[data.length - 1]?.co2_ppm.toFixed(2)}
                unit="ppm"
                full_unit="Parts per million"
            />
            
            <MetricCard
                title={`Percent Change in CO2 Concentration from ${startYear} to ${endYear}`}
                number={percentChange}
                unit="%"
                full_unit={`Or ${direction} at ${change.toFixed(2)} ppm change`}
            />

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">CO2 Concentration Over Time</h2>
            <LineChartComponent
             data={filteredData} 
             title="CO2 Concentration (ppm)"
             xKey="decimal_date"
             yKey="co2_ppm"
             unit="ppm"
            />
          </div>
        </div>
      );
    }
    
export default CO2;
    