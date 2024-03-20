import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileSummaryByMsg from './';

describe('FileSummaryByMsg', () => {
  const mockSetRenderComponent = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandleSetFileType = jest.fn();
  const mockFileType = 'all1';
  const mockEntityData = {
    memberFirm: '',
    receivedFrom: '',
    datefrom: '',
    dateto: '',
  };
  const mockRadioGroup = [
    { value: 'all1', label: 'All' },
    { value: 'warnings1', label: 'Warnings' },
    { value: 'errors1', label: 'Errors' },
  ];

  it('renders the component with the correct initial state', () => {
    render(
      <FileSummaryByMsg
        setRendercomponent={mockSetRenderComponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandleSetFileType}
        filetype={mockFileType}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );
    expect(
      screen.getByText('Data Profile - File summary by msg')
    ).toBeInTheDocument();
    expect(screen.getByTestId('radio-button-all1')).toBeInTheDocument();
    expect(screen.getByTestId('radio-button-warnings1')).toBeInTheDocument();
    expect(screen.getByTestId('radio-button-errors1')).toBeInTheDocument();
    expect(
      screen.getByTestId('radio-button-all1', { name: 'All' })
    ).toBeChecked();
  });

  it('changes the selected msg type when a different option is clicked', () => {
    render(
      <FileSummaryByMsg
        setRendercomponent={mockSetRenderComponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandleSetFileType}
        filetype={mockFileType}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );
    // Before change selection
    const allValueRadioButton = screen.getByTestId('radio-button-all');
    expect(allValueRadioButton.checked).toEqual(true);

    // Change selection
    const withValueRadioButton = screen.getByTestId('radio-button-warnings');
    fireEvent.click(withValueRadioButton, { target: { checked: true } });
    expect(withValueRadioButton.checked).toEqual(true);

    // Old value is no more checked
    expect(allValueRadioButton.checked).toEqual(false);
  });
});
