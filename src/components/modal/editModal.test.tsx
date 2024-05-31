import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import EditModal from './editModal'

describe('EditModal Component', () => {
  const defaultProps = {
    editingData: { name: '' },
    editMode: true,
    handleEdit: vi.fn(),
    closeModal: vi.fn(),
    fields: [{ name: 'name', placeholder: 'Enter name', required: true }],
    setEditingData: vi.fn(),
  }

  it('renders the modal when editingData and editMode are true', () => {
    render(<EditModal {...defaultProps} />)
    expect(screen.getByText(/Editar/i)).toBeInTheDocument()
  })

  it('calls closeModal when the Cancel button is clicked', () => {
    render(<EditModal {...defaultProps} />)
    const cancelButton = screen.getByText(/Cancelar/i)
    fireEvent.click(cancelButton)
    expect(defaultProps.closeModal).toHaveBeenCalled()
  })

  it('calls handleEdit when the Save button is clicked', () => {
    render(<EditModal {...defaultProps} />)
    const saveButton = screen.getByText(/Guardar/i)
    fireEvent.click(saveButton)
    expect(defaultProps.handleEdit).toHaveBeenCalled()
  })

  it('renders input fields with correct placeholders and values', () => {
    render(<EditModal {...defaultProps} />)
    const inputElement = screen.getByPlaceholderText(/Enter name/i)
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('')
  })

  it('calls setEditingData when input value is changed', () => {
    render(<EditModal {...defaultProps} />)
    const inputElement = screen.getByPlaceholderText(/Enter name/i)
    fireEvent.change(inputElement, { target: { value: 'New Name' } })
    expect(defaultProps.setEditingData).toHaveBeenCalledWith({
      name: 'New Name',
    })
  })

  it('does not render the modal when editingData or editMode are false', () => {
    const { rerender } = render(
      <EditModal {...defaultProps} editingData={null} />,
    )
    expect(screen.queryByText(/Editar/i)).not.toBeInTheDocument()

    rerender(<EditModal {...defaultProps} editMode={false} />)
    expect(screen.queryByText(/Editar/i)).not.toBeInTheDocument()
  })
})
