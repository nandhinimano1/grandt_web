import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from '.';

describe('Filter component', () => {
  let mockHandleInputChange;
  let mockHandlesSetFileType;
  let mockFiletype;
  let mockEntityData;
  let mockRadioGroup;

  beforeEach(() => {
    mockHandleInputChange = jest.fn();
    mockHandlesSetFileType = jest.fn();
    mockFiletype = 'all1';
    mockEntityData = {
      memberFirm: '',
      receivedFrom: '',
      datefrom: '',
      dateto: '',
    };
    mockRadioGroup = [
      { value: 'all1', label: 'All' },
      { value: 'warnings1', label: 'Warnings' },
      { value: 'errors1', label: 'Errors' },
    ];
  });

  it('renders with correct initial state', () => {
    render(
      <Filter
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );

    expect(screen.getByTestId('memberFirmSelect')).toBeInTheDocument();
    expect(screen.getByTestId('receivedFrom')).toBeInTheDocument();
    expect(screen.getByTestId('datefrom')).toBeInTheDocument();
    expect(screen.getByTestId('dateto')).toBeInTheDocument();
    expect(screen.getByTestId('radio-button-all1')).toBeInTheDocument();
    expect(screen.getByTestId('radio-button-warnings1')).toBeInTheDocument();
    expect(screen.getByTestId('radio-button-errors1')).toBeInTheDocument();
  });

  it('calls handleInputChange when input fields are changed', async () => {
    render(
      <Filter
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );

    const memberFirmSelect = screen.getByTestId('memberFirmSelect');
    fireEvent.change(memberFirmSelect, {
      target: { value: 'Firm1' },
    });
    await waitFor(() => {
      expect(memberFirmSelect).toBeInTheDocument('Firm1');
    });

    fireEvent.change(screen.getByTestId('receivedFrom'), {
      target: { value: 'example@example.com' },
    });

    await waitFor(() => {
      expect(mockHandleInputChange).toHaveBeenCalled();
    });
    const receivedFrom = screen.getByTestId('receivedFrom');
    fireEvent.change(receivedFrom, {
      target: { value: 'example@example.com' },
    });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it('calls handlessetfiletype when radio buttons are clicked', () => {
    render(
      <Filter
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );

    fireEvent.click(screen.getByTestId('radio-button-warnings1'));
    expect(mockHandlesSetFileType).toHaveBeenCalledWith('warnings1');

    fireEvent.click(screen.getByTestId('radio-button-errors1'));
    expect(mockHandlesSetFileType).toHaveBeenCalledWith('errors1');
  });
});
