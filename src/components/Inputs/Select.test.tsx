import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Select from './Select'
import {
  useForm,
  FieldValues,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  id: string
  label: string
  options: SelectOption[]
  disabled?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  big?: boolean
}

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
]

describe('Select Component', () => {
  const mockRegister: UseFormRegister<FieldValues> = vi.fn()

  const renderSelect = (props: Partial<SelectProps> = {}) => {
    const TestComponent: React.FC = () => {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      return (
        <form onSubmit={handleSubmit(vi.fn())}>
          <Select
            id='test-select'
            label='Test Select'
            options={mockOptions}
            register={register}
            errors={errors}
            {...props}
          />
        </form>
      )
    }

    render(<TestComponent />)
  }

  it('renders the Select component', () => {
    renderSelect()
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument()
  })

  it('renders all options', () => {
    renderSelect()
    fireEvent.click(screen.getByLabelText('Test Select'))
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('calls register function', () => {
    renderSelect({ register: mockRegister })
    expect(mockRegister).toHaveBeenCalledWith('test-select')
  })

  it('disables the select when disabled prop is true', () => {
    renderSelect({ disabled: true })
    expect(screen.getByLabelText('Test Select')).toBeDisabled()
  })

  it('displays error styles when errors are present', () => {
    const errors: FieldErrors = {
      'test-select': { message: 'Error message' } as any,
    }
    renderSelect({ errors })
    expect(screen.getByLabelText('Test Select')).toHaveClass(
      'focus:border-rose-500',
    )
  })

  it('applies custom width when big prop is true', () => {
    renderSelect({ big: true })
    expect(screen.getByLabelText('Test Select')).toHaveClass(
      'w-60 lg:w-[500px]',
    )
  })
})
