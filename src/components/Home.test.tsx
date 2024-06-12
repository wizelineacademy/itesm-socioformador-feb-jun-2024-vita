/// Home.test.tsx
import { render, screen } from '@testing-library/react'
import Home from './Home'
import { describe, it, expect, vi } from 'vitest'

// Mock de next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock de next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

describe('Home Component', () => {
  it('renders information component', () => {
    render(<Home />)
    const infoComponent = screen.getByText('Regístrate')
    expect(infoComponent).toBeInTheDocument()
  })

  it('renders registration button with correct link', () => {
    render(<Home />)
    const registerLink = screen.getByRole('link', { name: /Regístrate/i })
    expect(registerLink).toHaveAttribute('href', '/signup')
  })

  it('renders the image with correct src and alt text', () => {
    render(<Home />)
    const image = screen.getByAltText('Picture of the author')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/icons/heart.svg')
  })
})
