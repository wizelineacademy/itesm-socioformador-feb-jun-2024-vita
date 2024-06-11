import { ValueRecord } from '@/src/data/datatypes/autoeval'
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

interface BarChartProps {
  data: ValueRecord[]
  tags: string[]
  barColor: string
  infoColor: string
  xLabel: string
  yLabel: string
}

export const BarChartPlot: React.FC<BarChartProps> = ({
  data,
  tags,
  barColor,
  infoColor,
  xLabel,
  yLabel,
}) => {
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip rounded-xl bg-gray-100 px-5 py-5'>
          <p className='label mb-2 font-bold text-gray-900'>{`${tags[0]}: ${label}`}</p>
          <p
            className={`intro font-bold ${infoColor}`}
          >{`${tags[1]}: ${payload[0].value}`}</p>
        </div>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer width='100%' height='100%' data-testid='barchart'>
      <BarChart width={730} height={250} data={data}>
        <XAxis
          dataKey='name'
          label={{ value: xLabel, position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          label={{
            value: yLabel,
            angle: -90,
            position: 'insideCenter',
            offset: 15,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='value' className={barColor} />
      </BarChart>
    </ResponsiveContainer>
  )
}
