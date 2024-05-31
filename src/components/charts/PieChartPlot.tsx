import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

export interface PieChartRecord {
  type: string
  count: number
}

interface PieChartProps {
  data: PieChartRecord[]
  colors: string[]
}

const PieChartPlot: React.FC<PieChartProps> = ({ data, colors }) => {
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className='custom-tooltip rounded-xl bg-gray-100 px-5 py-5'>
          <p className='label mb-2 text-gray-900'>
            <span className='font-bold'>{data.type}:</span> {data.count} veces
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          outerRadius={150}
          fill='#8884d8'
          dataKey='count'
          nameKey='type'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartPlot
