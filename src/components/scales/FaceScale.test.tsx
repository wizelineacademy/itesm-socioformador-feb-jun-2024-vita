import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FaceScale from './FaceScale' // Import your component
import { expect, vi } from 'vitest'

test('renders each quality level with its icon', () => {
  render(<FaceScale quality={3} setQuality={() => {}} />)

  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText('3')).toBeInTheDocument()
  expect(screen.getByText('4')).toBeInTheDocument()
  expect(screen.getByText('5')).toBeInTheDocument()
  expect(screen.getByTestId('frown-1')).toBeInTheDocument()
  expect(screen.getByTestId('frown-2')).toBeInTheDocument()
  expect(screen.getByTestId('meh')).toBeInTheDocument()
  expect(screen.getByTestId('smile-1')).toBeInTheDocument()
  expect(screen.getByTestId('smile-2')).toBeInTheDocument()
})

test('clicking on icon calls the setQuality function', () => {
  const setQualityMock = vi.fn()

  render(<FaceScale quality={3} setQuality={setQualityMock} />)
  fireEvent.click(screen.getByTestId('frown-2'))

  expect(setQualityMock).toHaveBeenCalledWith(2)
})

test('faces display in white color except for the one matching the selected quality', () => {
  render(<FaceScale quality={3} setQuality={() => {}} />)

  expect(screen.getByTestId('frown-1')).toHaveClass('fill-white')
  expect(screen.getByTestId('frown-2')).toHaveClass('fill-white')
  expect(screen.getByTestId('meh')).toHaveClass('fill-yellow-500')
  expect(screen.getByTestId('smile-1')).toHaveClass('fill-white')
  expect(screen.getByTestId('smile-2')).toHaveClass('fill-white')
})
