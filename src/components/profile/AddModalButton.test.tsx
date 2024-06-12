import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddModalButton from './AddModalButton'

describe('AddModalButton Component', () => {
  it('renders the button when editMode is true', () => {
    const mockOnClick = vi.fn()
    render(<AddModalButton editMode={true} onClick={mockOnClick} />)
    const button = screen.getByRole('button', { name: '+' })
    expect(button).toBeInTheDocument()
  })

  it('does not render the button when editMode is false', () => {
    const mockOnClick = vi.fn()
    render(<AddModalButton editMode={false} onClick={mockOnClick} />)
    const button = screen.queryByRole('button', { name: '+' })
    expect(button).not.toBeInTheDocument()
  })

  it('calls onClick when the button is clicked', () => {
    const mockOnClick = vi.fn()
    render(<AddModalButton editMode={true} onClick={mockOnClick} />)
    const button = screen.getByRole('button', { name: '+' })
    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
