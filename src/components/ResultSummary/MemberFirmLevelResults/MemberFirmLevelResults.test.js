import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MemberFirmLevelResults from '.';
import apiservice from '../../../helper/apiservice';
import PreviewTable from '../../PreviewTable';
import Filter from '../Filter';

jest.mock('../../../helper/apiservice', () => ({
  getresultsummary: jest.fn().mockResolvedValue({
    data: [{ type: 'someFileType', details: [] }],
  }),
}));

jest.mock('../../PreviewTable', () => jest.fn(() => null));
jest.mock('../Filter', () => jest.fn(() => null));

describe('MemberFirmLevelResults component', () => {
  const mockSetRendercomponent = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandlesSetFileType = jest.fn();
  const mockFiletype = 'all';
  const mockEntityData = {
    memberFirm: 'Test Firm',
    receivedFrom: 'test@example.com',
    datefrom: '2023-01-01',
    dateto: '2023-01-31',
  };
  const mockRadioGroup = [
    { value: 'all', label: 'All' },
    { value: 'warnings', label: 'Warnings' },
    { value: 'errors', label: 'Errors' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Filter and PreviewTable components', () => {
    render(
      <MemberFirmLevelResults
        setRendercomponent={mockSetRendercomponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );

    expect(Filter).toHaveBeenCalledWith(
      expect.objectContaining({
        handleInputChange: mockHandleInputChange,
        handlessetfiletype: mockHandlesSetFileType,
        filetype: mockFiletype,
        entityData: mockEntityData,
        radioGroup: mockRadioGroup,
      }),
      expect.anything()
    );

    expect(PreviewTable).toHaveBeenCalledWith(
      expect.objectContaining({
        tableData: expect.any(Array),
        navigation: true,
      }),
      expect.anything()
    );
  });

  it('calls the API service to fetch result summary', async () => {
    apiservice.getresultsummary.mockResolvedValue({
      data: [{ type: mockFiletype, details: ['Detail 1', 'Detail 2'] }],
    });

    render(
      <MemberFirmLevelResults
        setRendercomponent={mockSetRendercomponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
      />
    );

    await waitFor(() => {
      expect(apiservice.getresultsummary).toHaveBeenCalledWith(mockFiletype);
    });
    await waitFor(() => {
      expect(PreviewTable).toHaveBeenCalledWith(
        expect.objectContaining({
          tableData: ['Detail 1', 'Detail 2'],
        }),
        expect.anything()
      );
    });
  });

  // Additional tests for user interactions, state updates, etc. can be added here
});
