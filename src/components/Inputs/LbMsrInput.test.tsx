import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LbMsrInput } from './LbMsrInput'
import { expect, vi } from 'vitest'

test('renders component with the provided label, measure and placeholder', () => {
  render(
    <LbMsrInput
      label='Test Label'
      variable='Test Variable'
      min={0}
      max={100}
      measure='Test Measure'
      value={50}
      setValue={() => {}}
    />,
  )

  expect(screen.getByText('Test Label')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Test Variable')).toBeInTheDocument()
  expect(screen.getByText('Test Measure')).toBeInTheDocument()
})

test('calls setValue when input changes', () => {
  const setValueMock = vi.fn()

  render(
    <LbMsrInput
      label='Test Label'
      variable='Test Variable'
      min={0}
      max={100}
      measure='Test Measure'
      value={50}
      setValue={setValueMock}
    />,
  )

  const input = screen.getByPlaceholderText('Test Variable')
  fireEvent.change(input, { target: { value: '75' } })

  expect(setValueMock).toHaveBeenCalledWith(75)
})

test('sets limits for the input', async () => {
  render(
    <LbMsrInput
      label='Test Label'
      variable='Test Variable'
      min={0}
      max={100}
      measure='Test Measure'
      value={50}
      setValue={() => {}}
    />,
  )

  const input = screen.getByRole('spinbutton')
  expect(input).toHaveAttribute('min', '0')
  expect(input).toHaveAttribute('max', '100')
})
