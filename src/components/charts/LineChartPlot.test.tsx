/* eslint-disable testing-library/no-container */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import { ValueRecord } from '@/src/data/datatypes/autoeval'
import { BarChartPlot } from './BarChartPlot'
import { LineChartPlot } from './LineChartPlot'

vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual('recharts')
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 800 }} data-testid='linechart'>
        {children}
      </div>
    ),
  }
})

const mockData: ValueRecord[] = [
  { name: '1', value: 30 },
  { name: '2', value: 50 },
  { name: '3', value: 70 },
  { name: '4', value: 60 },
  { name: '5', value: 65 },
]
const mockTags = ['Name', 'Value']
const mockLineColor = 'fill-emerald-500'
const mockInfoColor = 'text-black'
const mockXLabel = 'X Axis'
const mockYLabel = 'Y Axis'

test('renders correctly', () => {
  render(
    <LineChartPlot
      data={mockData}
      tags={mockTags}
      lineColor={mockLineColor}
      infoColor={mockInfoColor}
      xLabel={mockXLabel}
      yLabel={mockYLabel}
    />,
  )

  expect(screen.getByTestId('linechart')).toBeInTheDocument()
})

test('renders axis labels correctly', () => {
  render(
    <BarChartPlot
      data={mockData}
      tags={mockTags}
      barColor={mockLineColor}
      infoColor={mockInfoColor}
      xLabel={mockXLabel}
      yLabel={mockYLabel}
    />,
  )

  expect(screen.getByText('X Axis')).toBeInTheDocument()
  expect(screen.getByText('Y Axis')).toBeInTheDocument()
})

test('renders the correct amount of lines', async () => {
  const { container } = render(
    <LineChartPlot
      data={mockData}
      tags={mockTags}
      lineColor={mockLineColor}
      infoColor={mockInfoColor}
      xLabel={mockXLabel}
      yLabel={mockYLabel}
    />,
  )

  const lines = container.getElementsByClassName('recharts-line')
  expect(lines.length).toBe(1)
})
