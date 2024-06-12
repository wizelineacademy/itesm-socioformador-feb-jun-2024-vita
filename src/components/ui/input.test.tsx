import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from './input'

describe('Input component', () => {
  it('renders correctly', () => {
    render(<Input type='text' placeholder='Enter text' />)

    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(inputElement).toBeInTheDocument()
  })

  it('applies custom class correctly', () => {
    render(<Input type='text' className='custom-class' />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input type='text' disabled />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeDisabled()
  })

  it('displays the correct placeholder text', () => {
    render(<Input type='text' placeholder='Enter text' />)

    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(inputElement).toHaveAttribute('placeholder', 'Enter text')
  })

  it('sets the correct input type', () => {
    render(<Input type='text' />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveAttribute('type', 'text')
  })
})
