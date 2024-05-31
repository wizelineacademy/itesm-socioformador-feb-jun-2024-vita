/// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'
import { describe, it, expect } from 'vitest'
import { FaBeer } from 'react-icons/fa'

describe('Button Component', () => {
  it('renders the button label correctly', () => {
    render(<Button label='Click Me' />)
    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toBeInTheDocument()
  })

  it('disables the button when disabled prop is true', () => {
    render(<Button label='Click Me' disabled />)
    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toBeDisabled()
  })

  it('applies outline classes when outline prop is true', () => {
    render(<Button label='Click Me' outline borderColor='border-red-500' />)
    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toHaveClass('border-red-500')
  })

  it('applies correct size classes when big prop is true', () => {
    render(<Button label='Click Me' big />)
    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toHaveClass('text-xl w-60')
  })

  it('applies default size classes when big prop is false', () => {
    render(<Button label='Click Me' />)
    const buttonElement = screen.getByText(/Click Me/i)
    expect(buttonElement).toHaveClass('text-sm w-40')
  })
})
