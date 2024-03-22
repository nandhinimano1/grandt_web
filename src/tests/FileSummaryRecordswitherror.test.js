import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileSummaryRecordswitherror from '../components/ResultSummary/FileSummaryRecordswitherror';

describe('FileSummaryRecordswitherror', () => {
  const mockSetRenderComponent = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandleSetFileType = jest.fn();
  const mockFileType = 'Entity';
  const mockEntityData = {
    memberFirm: '',
    receivedFrom: '',
    datefrom: '',
    dateto: '',
  };
  const mockRadioGroup = [
    { value: 'all', label: 'All' },
    { value: 'warnings', label: 'Warnings' },
    { value: 'errors', label: 'Errors' },
  ];

  it('renders the component with the correct initial state', () => {
    render(
      <FileSummaryRecordswitherror
        setRendercomponent={mockSetRenderComponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandleSetFileType}
        filetype={mockFileType}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );
    expect(
      screen.getByText('Data Profile - Records with errors')
    ).toBeInTheDocument();
    expect(screen.getByText('Warnings/Errors found')).toBeInTheDocument();
  });

  it('calls setRenderComponent when "Back to MF file search" button is clicked', () => {
    render(
      <FileSummaryRecordswitherror
        setRendercomponent={mockSetRenderComponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandleSetFileType}
        filetype={mockFileType}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );
    fireEvent.click(screen.getByText('Back to MF file search'));
    expect(mockSetRenderComponent).toHaveBeenCalled();
  });
});
