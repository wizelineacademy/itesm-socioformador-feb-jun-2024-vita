import { render, screen, fireEvent } from '@testing-library/react'
import SearchBarButton from './SearchbarButton'
import { describe, it, expect, vi } from 'vitest'

describe('SearchBarButton Component', () => {
  it('renders input with correct placeholder', () => {
    render(
      <SearchBarButton
        placeholder='Buscar...'
        list={[]}
        setList={() => {}}
        action={() => {}}
      />,
    )
    const inputElement = screen.getByPlaceholderText(/Buscar.../i)
    expect(inputElement).toBeInTheDocument()
  })

  it('calls filterList function on input change', () => {
    const setList = vi.fn()
    render(
      <SearchBarButton
        placeholder='Buscar...'
        list={['apple', 'banana', 'orange']}
        setList={setList}
        action={() => {}}
      />,
    )
    const inputElement = screen.getByPlaceholderText(/Buscar.../i)
    fireEvent.change(inputElement, { target: { value: 'ap' } })
    expect(setList).toHaveBeenCalledWith(['apple'])
  })

  it('calls action function on button click', () => {
    const action = vi.fn()
    render(
      <SearchBarButton
        placeholder='Buscar...'
        list={[]}
        setList={() => {}}
        action={action}
      />,
    )
    const buttonElement = screen.getByRole('button', { name: /Continuar/i })
    fireEvent.click(buttonElement)
    expect(action).toHaveBeenCalled()
  })
})
