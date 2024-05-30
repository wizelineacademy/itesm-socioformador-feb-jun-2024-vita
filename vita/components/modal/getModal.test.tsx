import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GetModal from './getModal';

describe('GetModal Component', () => {
  const defaultProps = {
    modalOpen: true,
    closeModal: vi.fn(),
    modalTitle: 'Modal Title',
    modalContent: [
      { label: 'Label 1', value: 'Value 1' },
      { label: 'Label 2', value: 'Value 2' },
    ],
    onCloseButtonClick: vi.fn(),
  };

  it('renders the modal when modalOpen is true', () => {
    render(<GetModal {...defaultProps} />);
    expect(screen.getByText(/Modal Title/i)).toBeInTheDocument();
  });

  it('renders the correct content', () => {
    render(<GetModal {...defaultProps} />);
    defaultProps.modalContent.forEach(content => {
      expect(screen.getByText(content.label)).toBeInTheDocument();
      expect(screen.getByText(content.value)).toBeInTheDocument();
    });
  });

  it('calls onCloseButtonClick when the Close button is clicked', () => {
    render(<GetModal {...defaultProps} />);
    const closeButton = screen.getByText(/Cerrar/i);
    fireEvent.click(closeButton);
    expect(defaultProps.onCloseButtonClick).toHaveBeenCalled();
  });

  it('does not render the modal when modalOpen is false', () => {
    render(<GetModal {...defaultProps} modalOpen={false} />);
    expect(screen.queryByText(/Modal Title/i)).not.toBeInTheDocument();
  });
});
