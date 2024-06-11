/* eslint-disable testing-library/no-container */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import { ValueRecord } from '@/src/data/datatypes/autoeval'
import { BarChartPlot } from './BarChartPlot'

vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual('recharts')
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 800 }} data-testid='barchart'>
        {children}
      </div>
    ),
  }
})

const mockData: ValueRecord[] = [
  { name: 'A', value: 30 },
  { name: 'B', value: 50 },
  { name: 'C', value: 70 },
]
const mockTags = ['Name', 'Value']
const mockBarColor = 'fill-emerald-500'
const mockInfoColor = 'text-black'
const mockXLabel = 'X Axis'
const mockYLabel = 'Y Axis'

test('renders correctly', () => {
  render(
    <BarChartPlot
      data={mockData}
      tags={mockTags}
      barColor={mockBarColor}
      infoColor={mockInfoColor}
      xLabel={mockXLabel}
      yLabel={mockYLabel}
    />,
  )

  expect(screen.getByTestId('barchart')).toBeInTheDocument()
})

test('renders axis labels correctly', () => {
  render(
    <BarChartPlot
      data={mockData}
      tags={mockTags}
      barColor={mockBarColor}
      infoColor={mockInfoColor}
      xLabel={mockXLabel}
      yLabel={mockYLabel}
    />,
  )

  expect(screen.getByText('X Axis')).toBeInTheDocument()
  expect(screen.getByText('Y Axis')).toBeInTheDocument()
})

test('renders the correct amount of bars', () => {
  const { container } = render(
    <BarChartPlot
      data={mockData}
      tags={mockTags}
      barColor={mockBarColor}
      infoColor={mockInfoColor}
      xLabel={mockXLabel}
      yLabel={mockYLabel}
    />,
  )

  const bars = container.getElementsByClassName('recharts-bar-rectangle')
  expect(bars.length).toBe(3)
})
