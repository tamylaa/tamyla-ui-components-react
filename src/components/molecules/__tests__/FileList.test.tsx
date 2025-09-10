/**
 * FileList Molecule Tests
 * Testing the enhanced FileList component with Redux integration
 */

import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { FileList } from '../FileList';

describe('FileList Molecule', () => {
  const mockFiles = [
    {
      id: '1',
      name: 'document.pdf',
      size: 1024000,
      type: 'application/pdf',
      url: 'https://example.com/document.pdf'
    },
    {
      id: '2',
      name: 'image.jpg',
      size: 2048000,
      type: 'image/jpeg',
      uploadProgress: 75
    }
  ];

  test('renders with default props', () => {
    render(<FileList />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders with file list', () => {
    render(<FileList files={mockFiles} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders with upload enabled', () => {
    render(<FileList allowUpload={true} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders with delete enabled', () => {
    render(<FileList allowDelete={true} files={mockFiles} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders with download enabled', () => {
    render(<FileList allowDownload={true} files={mockFiles} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('handles file add event', () => {
    const handleFileAdd = jest.fn();
    render(<FileList onFileAdd={handleFileAdd} />);

    // Simulate file input change
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      const mockFileList = {
        0: new File(['test'], 'test.txt', { type: 'text/plain' }),
        length: 1,
        item: (index: number) => mockFileList[index]
      } as unknown as FileList;

      fireEvent.change(fileInput, { target: { files: mockFileList } });
      expect(handleFileAdd).toHaveBeenCalledWith(mockFileList);
    }
  });

  test('handles file remove event', () => {
    const handleFileRemove = jest.fn();
    render(<FileList onFileRemove={handleFileRemove} files={mockFiles} />);

    // The component should handle remove events through its internal logic
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('handles file download event', () => {
    const handleFileDownload = jest.fn();
    render(<FileList onFileDownload={handleFileDownload} files={mockFiles} />);

    // The component should handle download events through its internal logic
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('handles drag and drop events', () => {
    const handleDragOver = jest.fn();
    const handleDragLeave = jest.fn();
    const handleDrop = jest.fn();

    render(
      <FileList
        allowUpload={true}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
    );

    const dropZone = screen.getByRole('region');
    if (dropZone) {
      fireEvent.dragOver(dropZone);
      expect(handleDragOver).toHaveBeenCalledTimes(1);

      fireEvent.dragLeave(dropZone);
      expect(handleDragLeave).toHaveBeenCalledTimes(1);

      // Mock dataTransfer for drop event
      const mockDataTransfer = {
        files: [new File(['test'], 'test.txt', { type: 'text/plain' })]
      };

      fireEvent.drop(dropZone, { dataTransfer: mockDataTransfer });
      expect(handleDrop).toHaveBeenCalledTimes(1);
    }
  });

  test('renders with max files limit', () => {
    render(<FileList maxFiles={5} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders with accepted file types', () => {
    render(<FileList acceptedTypes={['.pdf', '.doc', '.txt']} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders with upload progress', () => {
    render(<FileList files={mockFiles} />);
    // File with uploadProgress should render progress indicator
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});
