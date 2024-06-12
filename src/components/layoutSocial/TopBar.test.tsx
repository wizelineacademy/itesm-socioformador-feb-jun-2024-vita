import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TopBar from './TopBar'
import { useRouter, usePathname } from 'next/navigation'
import { expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}))

describe('TopBar Component', () => {
  const pushMock = vi.fn()
  const useRouterMock = useRouter as vi.Mock
  const usePathnameMock = usePathname as vi.Mock

  beforeEach(() => {
    useRouterMock.mockReturnValue({ push: pushMock })
    usePathnameMock.mockReturnValue('/social')
  })

  it('renders the input and button correctly', () => {
    render(<TopBar />)

    expect(
      screen.getByPlaceholderText('Busca publicaciones...'),
    ).toBeInTheDocument()
    expect(screen.getByText('Crear una Publicación')).toBeInTheDocument()
  })

  it('navigates to create post page on button click', () => {
    render(<TopBar />)

    const button = screen.getByText('Crear una Publicación')
    fireEvent.click(button)

    expect(pushMock).toHaveBeenCalledWith('/social/create-post')
  })
})
