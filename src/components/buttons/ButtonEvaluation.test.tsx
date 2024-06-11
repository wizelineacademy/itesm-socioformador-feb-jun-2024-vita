import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import ButtonEvaluation from './ButtonEvaluation.'

test("displays button's text correctly", () => {
  render(<ButtonEvaluation text='Submit' onClick={() => {}} />)
  const buttonText = screen.getByText('Submit')
  expect(buttonText).toBeInTheDocument()
})

test('button is disabled when disabled prop is true', () => {
  render(<ButtonEvaluation text='Submit' disabled onClick={() => {}} />)
  const button = screen.getByRole('button')
  expect(button).toBeDisabled()
})

test('Calls click function when button is clicked', () => {
  const handleClick = vi.fn()

  render(<ButtonEvaluation text='Submit' onClick={handleClick} />)
  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(handleClick).toHaveBeenCalledOnce()
})
