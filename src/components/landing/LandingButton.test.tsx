import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './LandingButton'
import { describe, test, expect, vi } from 'vitest'

describe('LandingButton Component', () => {
  test('renders with the correct text', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toBeInTheDocument()
  })

  test('triggers onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    const button = screen.getByText('Click Me')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })

  test('has the correct class names for default variant', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toHaveClass(
      'bg-primary text-primary-foreground hover:bg-primary/90',
    )
  })

  test('applies custom class names', () => {
    render(<Button className='custom-class'>Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toHaveClass('custom-class')
  })
})
