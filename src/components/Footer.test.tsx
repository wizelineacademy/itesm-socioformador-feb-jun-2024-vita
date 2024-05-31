/// Footer.test.tsx
import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import { describe, it, expect } from 'vitest'

describe('Footer Component', () => {
  it('renders VITA title correctly', () => {
    render(<Footer />)
    const vitaTitle = screen.getByText(/VITA/i)
    expect(vitaTitle).toBeInTheDocument()
  })

  it('renders contact title correctly', () => {
    render(<Footer />)
    const contactTitle = screen.getByText(/Contáctanos/i)
    expect(contactTitle).toBeInTheDocument()
  })

  it('renders author links', () => {
    render(<Footer />)
    const authorLinks = [
      screen.getByText('@Bdelas777'),
      screen.getByText('@JulioEmmmanuel'),
      screen.getByText('@SofiRegiM'),
      screen.getByText('@edan11v'),
    ]
    authorLinks.forEach((link) => {
      expect(link).toBeInTheDocument()
    })
  })
})
