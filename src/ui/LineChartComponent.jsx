import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const LineChartComponent = ( {data, xKey, yKey, title, unit}) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={xKey} 
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => Math.floor(value)}
                />
                <YAxis
                  label={{ value: title, angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  labelFormatter={(value) => `Year: ${value.toFixed(2)}`}
                  formatter={(value) => [`${value.toFixed(2)} ${unit}`, yKey]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={yKey} 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={false} 
                  name={title}
                />
              </LineChart>
            </ResponsiveContainer>
    </div>
  )
}

export default LineChartComponent
