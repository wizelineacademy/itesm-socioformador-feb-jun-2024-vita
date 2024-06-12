import React from 'react'
import { render, screen } from '@testing-library/react'
import About from './Landing_About'
import { describe, test, expect } from 'vitest'

describe('About Component', () => {
  test('renders without crashing', () => {
    render(<About />)
  })

  test('displays the correct heading', () => {
    render(<About />)
    const heading = screen.getByText('Acerca De')
    expect(heading).toBeInTheDocument()
  })

  test('displays the correct description', () => {
    render(<About />)
    const description = screen.getByText(
      /es una aplicación para monitorear tu salud a todo momento y recibir asesoramiento a través de inteligencia artificial y expertos en la salud./i,
    )
    expect(description).toBeInTheDocument()
  })

  test('displays the VITA text correctly', () => {
    render(<About />)
    const vitaText = screen.getByText('VITA', { exact: false })
    expect(vitaText).toBeInTheDocument()
  })
})
