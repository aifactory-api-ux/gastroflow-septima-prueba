import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../../src/components/ui/Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('renders modal with children when open', () => {
    it('Modal should render its children and be visible when open prop is true', () => {
      render(
        <Modal open={true} title="Test Modal" onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeTruthy();
      expect(screen.getByText('Modal Content')).toBeTruthy();
    });
  });

  describe('does not render modal when open is false', () => {
    it('Modal should not render or be visible when open prop is false', () => {
      render(
        <Modal open={false} title="Test Modal" onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  describe('calls onClose when close button is clicked', () => {
    it('Modal should call the onClose handler when the close button is clicked', () => {
      render(
        <Modal open={true} title="Test Modal" onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});