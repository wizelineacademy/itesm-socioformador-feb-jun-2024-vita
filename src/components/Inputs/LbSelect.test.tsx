import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LbSelect } from './LbSelect'
import { expect, test, vi } from 'vitest'

test('renders LbSelect with options', () => {
  const options = ['Option 1', 'Option 2', 'Option 3']
  const setValue = vi.fn()
  render(
    <LbSelect
      label='Test Label'
      options={options}
      value=''
      setValue={setValue}
    />,
  )

  options.forEach((option) => {
    expect(screen.getByText(option)).toBeInTheDocument()
  })
})

test('calls onChange when option is selected', () => {
  const handleChange = vi.fn()
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <LbSelect
      label='Test Label'
      options={options}
      value=''
      setValue={handleChange}
    />,
  )

  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'Option 2' },
  })
  expect(handleChange).toHaveBeenCalledWith('Option 2')
})
