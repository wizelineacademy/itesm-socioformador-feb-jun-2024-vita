// SleepTimeSelection.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SleepTimeSelection } from './SleepTimeSelection'
import { expect, vi } from 'vitest'
import '@testing-library/jest-dom'

// Primera prueba: verifica que el componente se renderiza correctamente con los elementos proporcionados
test('renders component with provided time, label and day', () => {
  render(
    <SleepTimeSelection
      time='08:00'
      label='Sleep Time'
      day='Hoy'
      setTime={() => {}}
      setDay={() => {}}
    />,
  )

  // Verifica que el label se renderiza
  expect(screen.getByText('Sleep Time')).toBeInTheDocument()

  // Verifica que el input de tiempo se renderiza con el valor correcto
  expect(screen.getByDisplayValue('08:00')).toBeInTheDocument()

  // Verifica que los botones se renderizan
  expect(screen.getByText('Ayer')).toBeInTheDocument()
  expect(screen.getByText('Hoy')).toBeInTheDocument()
})

// Segunda prueba: verifica que setTime se llama cuando el input de tiempo cambia
test('calls setTime when input changes', () => {
  const setTimeMock = vi.fn()

  render(
    <SleepTimeSelection
      time='08:00'
      label='Sleep Time'
      day='Hoy'
      setTime={setTimeMock}
      setDay={() => {}}
    />,
  )

  const timeInput = screen.getByDisplayValue('08:00')
  fireEvent.change(timeInput, { target: { value: '09:00' } })

  expect(setTimeMock).toHaveBeenCalledWith('09:00')
})

// Tercera prueba: verifica que setDay se llama cuando se hace clic en los botones
test('calls setDay when buttons are clicked', () => {
  const setDayMock = vi.fn()

  render(
    <SleepTimeSelection
      time='08:00'
      label='Sleep Time'
      day='Hoy'
      setTime={() => {}}
      setDay={setDayMock}
    />,
  )

  const ayerButton = screen.getByText('Ayer')
  fireEvent.click(ayerButton)
  expect(setDayMock).toHaveBeenCalledWith('Ayer')

  const hoyButton = screen.getByText('Hoy')
  fireEvent.click(hoyButton)
  expect(setDayMock).toHaveBeenCalledWith('Hoy')
})
