// src/components/Decoration.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Decoration from './Decoration'
import { describe, expect, it } from 'vitest'
// Bernardo de la Sierra Rábago
describe('Decoration component', () => {
  it('renders the correct images for the /home route', () => {
    render(<Decoration pathname='/home' />)

    const images1 = screen.getAllByAltText('Imagen 1')
    const images2 = screen.getAllByAltText('Imagen 2')

    expect(images1[0]).toHaveAttribute('src', '/icons/DE_Home.svg')
    expect(images1[1]).toHaveAttribute('src', '/icons/DE_Home.svg')
    expect(images2[0]).toHaveAttribute('src', '/icons/DE_Home2.svg')
    expect(images2[1]).toHaveAttribute('src', '/icons/DE_Home2.svg')
  })

  it('renders the correct images for the /nutrition route', () => {
    render(<Decoration pathname='/nutrition' />)

    const images1 = screen.getAllByAltText('Imagen 1')
    const images2 = screen.getAllByAltText('Imagen 2')

    expect(images1[0]).toHaveAttribute('src', '/icons/DE_Nutrition.svg')
    expect(images1[1]).toHaveAttribute('src', '/icons/DE_Nutrition.svg')
    expect(images2[0]).toHaveAttribute('src', '/icons/DE_Nutrition2.svg')
    expect(images2[1]).toHaveAttribute('src', '/icons/DE_Nutrition2.svg')
  })

  it('hides images for the /social route', () => {
    render(<Decoration pathname='/social' />)

    expect(screen.queryByAltText('Imagen 1')).toBeNull()
    expect(screen.queryByAltText('Imagen 2')).toBeNull()
  })

  it('hides images for any /social sub-routes', () => {
    render(<Decoration pathname='/social/subroute' />)

    expect(screen.queryByAltText('Imagen 1')).toBeNull()
    expect(screen.queryByAltText('Imagen 2')).toBeNull()
  })

  it('renders loading component while images are loading', () => {
    render(<Decoration pathname='/inexistent' />)

    expect(screen.getByTestId('loading')).toBeInTheDocument() // Assuming Loading component renders a div
  })
})
