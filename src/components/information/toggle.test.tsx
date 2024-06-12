import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ToggleComponent from './toggle'

describe('ToggleComponent', () => {
  const title = 'Test Title'
  const children = <div>Test Content</div>

  const renderToggle = (editModeToggle: boolean) => {
    render(
      <ToggleComponent title={title} editModeToggle={editModeToggle}>
        {children}
      </ToggleComponent>,
    )
  }

  it('renders the ToggleComponent with the title', () => {
    renderToggle(false)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('shows content when editModeToggle is true', () => {
    renderToggle(true)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not show content when editModeToggle is false', () => {
    renderToggle(false)
    expect(screen.queryByText('Test Content')).toBeNull()
  })

  it('toggles content visibility when button is clicked', () => {
    renderToggle(false)
    const button = screen.getByRole('button', { name: /Test Title/i })
    fireEvent.click(button)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.queryByText('Test Content')).toBeNull()
  })
})
