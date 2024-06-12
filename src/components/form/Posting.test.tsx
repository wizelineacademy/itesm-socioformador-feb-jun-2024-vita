import { render, screen } from '@testing-library/react'
import Posting from './Posting'
import { describe, it, expect, vi } from 'vitest'

// Mock useRouter
const mockPush = vi.fn()
const mockRefresh = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}))

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(
  () => 'blob:http://localhost:3000/test-blob-url',
)

describe('Posting Component', () => {
  const post = {
    caption: 'Test Caption',
    tag: 'Test Tag',
    postPhoto: '/test-photo-url.jpg',
  }

  const apiEndpoint = '/api/endpoint'

  it('renders the form correctly', () => {
    render(<Posting post={post} apiEndpoint={apiEndpoint} />)

    expect(screen.getByLabelText('Tema')).toBeInTheDocument()
    expect(screen.getByLabelText('Tag')).toBeInTheDocument()
    expect(screen.getByText('Cambiar de Foto')).toBeInTheDocument()
  })
})
