import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MemberFirmSummary from '.';
import apiservice from '../../../helper/apiservice';
import PreviewTable from '../../PreviewTable';
import Filter from '../Filter';

jest.mock('../../../helper/apiservice', () => ({
  getrcvd: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        name: 'Received Item 1',
      },
      {
        id: 2,
        name: 'Received Item 2',
      },
    ],
  }),
  getresultsummary: jest.fn().mockResolvedValue({
    data: [
      {
        'Total files': 10,
        Passed: 8,
        Failed: 2,
      },
    ],
  }),
}));

jest.mock('../../PreviewTable', () => jest.fn(() => null));
jest.mock('../Filter', () => jest.fn(() => null));

describe('MemberFirmSummary component', () => {
  const mockSetRendercomponent = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandlesSetFileType = jest.fn();
  const mockresetEntityData = jest.fn();
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

  it('renders and fetches data for received', async () => {
    render(
      <MemberFirmSummary
        setRendercomponent={mockSetRendercomponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
        resetEntityData={mockresetEntityData}
      />
    );

    await waitFor(() => {
      expect(apiservice.getrcvd).toHaveBeenCalled();
    });
  });

  it('renders and fetches data for result summary', async () => {
    render(
      <MemberFirmSummary
        setRendercomponent={mockSetRendercomponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
        resetEntityData={mockresetEntityData}
      />
    );

    await waitFor(() => {
      expect(apiservice.getresultsummary).toHaveBeenCalledWith(mockFiletype);
    });
  });

  it('renders the Filter and PreviewTable components', () => {
    render(
      <MemberFirmSummary
        setRendercomponent={mockSetRendercomponent}
        handleInputChange={mockHandleInputChange}
        handlessetfiletype={mockHandlesSetFileType}
        filetype={mockFiletype}
        entityData={mockEntityData}
        radioGroup={mockRadioGroup}
        resetEntityData={mockresetEntityData}
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
        ignoretitle: true,
        expand: true,
        addnavigationall: true,
      }),
      expect.anything()
    );
  });
});
