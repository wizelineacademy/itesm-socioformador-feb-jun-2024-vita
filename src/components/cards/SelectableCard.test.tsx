import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import SelectableCard from './SelectableCard'
import { FaDumbbell } from 'react-icons/fa'

test('displays card text correctly', () => {
  render(
    <SelectableCard
      text='Exercise'
      icon={FaDumbbell}
      selected={false}
      toggle={() => {}}
    />,
  )
  const cardElement = screen.getByText('Exercise')
  expect(cardElement).toBeInTheDocument()
})

test('check icon is displayed when selected prop is true', () => {
  render(
    <SelectableCard
      text='Exercise'
      icon={FaDumbbell}
      selected={true}
      toggle={() => {}}
    />,
  )
  const checkIcon = screen.getByTestId('check')
  expect(checkIcon).toBeInTheDocument()
})

test('Shows light color when selected prop is false', () => {
  render(
    <SelectableCard
      text='Exercise'
      icon={FaDumbbell}
      selected={false}
      toggle={() => {}}
    />,
  )
  const cardElement = screen.getByRole('button')
  expect(cardElement).toHaveClass('bg-mid-green')
})

test('Shows dark color when selected prop is true', () => {
  render(
    <SelectableCard
      text='Exercise'
      icon={FaDumbbell}
      selected={true}
      toggle={() => {}}
    />,
  )
  const cardElement = screen.getByRole('button')
  expect(cardElement).toHaveClass('bg-dark-green')
})

test('Calls toggle function when clicked', () => {
  const handleClick = vi.fn()

  render(
    <SelectableCard
      text='Exercise'
      icon={FaDumbbell}
      selected={true}
      toggle={handleClick}
    />,
  )
  const cardElement = screen.getByRole('button')
  fireEvent.click(cardElement)

  expect(handleClick).toHaveBeenCalledOnce()
})
