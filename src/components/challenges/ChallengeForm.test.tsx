import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChallengeForm from './ChallengeForm'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

// Mock useRouter, Swal, and axios
vi.mock('axios')
vi.mock('sweetalert2')
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => '/mocked-url')

describe('ChallengeForm Component', () => {
  it('renders the form correctly', () => {
    render(<ChallengeForm />)

    const descriptionLabel = screen.getByLabelText('Descripción')
    const submitButton = screen.getByRole('button', { name: /Subir Reto/i })

    expect(descriptionLabel).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('shows error messages when required fields are empty', async () => {
    render(<ChallengeForm />)

    const submitButton = screen.getByRole('button', { name: /Subir Reto/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      const descriptionError = screen.getByText('La descripción es requerida')
      const photoError = screen.getByText('La fotografía es requerida!')

      expect(descriptionError).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(photoError).toBeInTheDocument()
    })
  })

  it('submits the form successfully', async () => {
    const mockPush = vi.fn()
    const mockRefresh = vi.fn()
    const mockedUseRouter = {
      push: mockPush,
      refresh: mockRefresh,
      back: vi.fn(),
      forward: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }
    vi.mocked(useRouter).mockReturnValue(mockedUseRouter)

    const mockPost = vi.fn().mockResolvedValue({})
    axios.post = mockPost

    render(<ChallengeForm />)

    const descriptionTextarea = screen.getByPlaceholderText('¿Qué piensas?')
    const fileInput = screen.getByLabelText('Agregar una Foto')
    const submitButton = screen.getByRole('button', { name: /Subir Reto/i })

    fireEvent.change(descriptionTextarea, {
      target: { value: 'Descripción del reto' },
    })
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    })
    fireEvent.change(fileInput, {
      target: { files: [file] },
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        '/api/monthlyChallenge',
        expect.any(FormData),
      )
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockRefresh).toHaveBeenCalled()
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockPush).toHaveBeenCalledWith('/home/challenge')
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Éxito',
        text: 'Se ha subido la respuesta con éxito acuerdate de evaluar 5 compañeros más para ganar más puntos',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    })
  })

  it('shows error alert on form submission failure', async () => {
    const mockPost = vi.fn().mockRejectedValue(new Error('Submission failed'))
    axios.post = mockPost

    render(<ChallengeForm />)

    const descriptionTextarea = screen.getByPlaceholderText('¿Qué piensas?')
    const fileInput = screen.getByLabelText('Agregar una Foto')
    const submitButton = screen.getByRole('button', { name: /Subir Reto/i })

    fireEvent.change(descriptionTextarea, {
      target: { value: 'Descripción del reto' },
    })
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    })
    fireEvent.change(fileInput, {
      target: { files: [file] },
    })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Error',
        text: 'Ocurrió un error al subir la respuesta',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    })
  })
})
