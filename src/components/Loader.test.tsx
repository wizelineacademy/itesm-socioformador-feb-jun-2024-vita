import { render, screen } from '@testing-library/react'
import Loader from './Loader'
import { describe, it, expect } from 'vitest'

describe('Loader Component', () => {
  it('renders the loader component', () => {
    render(<Loader />)

    const loaderElement = screen.getByTestId('loader')
    expect(loaderElement).toBeInTheDocument()
  })

  it('has the correct classes for styling and animation', () => {
    render(<Loader />)

    const loaderElement = screen.getByTestId('loader')
    expect(loaderElement).toHaveClass(
      'h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500',
    )
  })
})
