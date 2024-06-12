// ListItem.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import ListItem from './ListItem'
import { expect } from 'vitest'
import '@testing-library/jest-dom'

test('renders ListItem with provided text', () => {
  const testText = 'Test Item'

  render(<ListItem text={testText} />)

  // Verifica que el texto se renderiza correctamente
  expect(screen.getByText(testText)).toBeInTheDocument()

  // Verifica que el elemento tiene la clase CSS correcta
  const listItem = screen.getByText(testText)
  expect(listItem).toHaveClass('bg-custom-lightpurple')
  expect(listItem).toHaveClass('mx-auto')
  expect(listItem).toHaveClass('mt-5')
  expect(listItem).toHaveClass('flex')
  expect(listItem).toHaveClass('w-4/5')
  expect(listItem).toHaveClass('rounded-3xl')
  expect(listItem).toHaveClass('px-5')
  expect(listItem).toHaveClass('py-3')
  expect(listItem).toHaveClass('font-medium')
  expect(listItem).toHaveClass('text-white')
  expect(listItem).toHaveClass('sm:w-3/5')
  expect(listItem).toHaveClass('md:w-2/5')
  expect(listItem).toHaveClass('md:max-w-[275px]')
  expect(listItem).toHaveClass('md:py-4')
})
