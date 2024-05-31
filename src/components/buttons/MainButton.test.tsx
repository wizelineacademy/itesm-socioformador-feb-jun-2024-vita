import React from 'react'
import { render } from '@testing-library/react'
import MainButton from './MainButton'
import { expect, test } from 'vitest'

test('renders button with correct text', () => {
  const buttonText = 'Click me!'
  render(<MainButton text={buttonText} onClick={() => {}} />)
  const buttonElement = screen.getByText(buttonText)
  expect(buttonElement).toBeInTheDocument()
})

test('button is disabled when disabled prop is true', () => {
  render(<MainButton text='Click me!' disabled onClick={() => {}} />)
  const buttonElement = screen.getByText('Click me!')
  expect(buttonElement).toBeDisabled()
})
