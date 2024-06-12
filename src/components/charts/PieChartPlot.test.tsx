import React from 'react'
import { render } from '@testing-library/react'
import PieChartPlot from './PieChartPlot'

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('PieChartPlot Component', () => {
  const pieData = [
    { type: 'Red', count: 300 },
    { type: 'Blue', count: 50 },
    { type: 'Yellow', count: 100 },
  ]

  const colors = ['#FF6384', '#36A2EB', '#FFCE56']

  it('renders without crashing', () => {
    render(<PieChartPlot data={pieData} colors={colors} />)
  })
})
