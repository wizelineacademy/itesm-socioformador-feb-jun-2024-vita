import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddModal from './addModal';

describe('AddModal Component', () => {
  const defaultProps = {
    modalOpen: true,
    editMode: true,
    closeModal: vi.fn(),
    handleAddItem: vi.fn(),
    item: { name: '' }, 
    handleItemChange: vi.fn(),
    title: 'Add Item',
    fields: [{ name: 'name', placeholder: 'Enter name' }]
  };

  it('renders the modal when modalOpen and editMode are true', () => {
    render(<AddModal {...defaultProps} />);
    expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
  });

  it('calls closeModal when the Cancel button is clicked', () => {
    render(<AddModal {...defaultProps} />);
    const cancelButton = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelButton);
    expect(defaultProps.closeModal).toHaveBeenCalled();
  });

  it('calls handleAddItem when the Add button is clicked', () => {
    render(<AddModal {...defaultProps} />);
    const addButton = screen.getByText(/Agregar/i);
    fireEvent.click(addButton);
    expect(defaultProps.handleAddItem).toHaveBeenCalled();
  });

  it('renders input fields with correct placeholders and values', () => {
    render(<AddModal {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText(/Enter name/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('calls handleItemChange when input value is changed', () => {
    render(<AddModal {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText(/Enter name/i);
    fireEvent.change(inputElement, { target: { value: 'New Item' } });
    expect(defaultProps.handleItemChange).toHaveBeenCalled();
  });

  it('does not render the modal when modalOpen or editMode are false', () => {
    const { rerender } = render(<AddModal {...defaultProps} modalOpen={false} />);
    expect(screen.queryByText(/Add Item/i)).not.toBeInTheDocument();

    rerender(<AddModal {...defaultProps} editMode={false} />);
    expect(screen.queryByText(/Add Item/i)).not.toBeInTheDocument();
  });
});
