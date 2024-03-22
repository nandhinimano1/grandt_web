/* eslint-disable testing-library/no-wait-for-side-effects */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import apiservice from '../helper/apiservice';
import BusinessRelationshipForm from '../components/Onboard/BusinessRelationshipForm';

jest.mock('../../../helper/apiservice');

beforeEach(() => {
  jest.resetAllMocks();
  apiservice.getmemberfirm.mockResolvedValue({ data: ['Firm1', 'Firm2'] });
  apiservice.getprocessedby.mockResolvedValue({ data: ['User1', 'User2'] });
  apiservice.postentityData.mockResolvedValue({});
});

describe('<BusinessRelationshipForm />', () => {
  it('Should render the form with initial values', async () => {
    const memberFirmsData = ['Firm1', 'Firm2'];
    apiservice.getmemberfirm.mockResolvedValue({ data: memberFirmsData });

    render(<BusinessRelationshipForm />);
    await waitFor(() => {
      expect(screen.getByTestId('memberFirmSelect')).toHaveValue('');
    });

    expect(screen.getByTestId('receivedFromInput')).toHaveValue('');
    expect(screen.getByTestId('processedByInput')).toHaveValue('');
    expect(screen.getByTestId('receivedDate')).toHaveValue(
      new Date().toISOString().split('T')[0]
    );
    expect(screen.getByTestId('filechosen')).toBeInTheDocument();
  });

  it('Should update member firm value on change', async () => {
    render(<BusinessRelationshipForm />);
    const memberFirmSelect = screen.getByTestId('memberFirmSelect');
    await waitFor(() => {
      fireEvent.change(memberFirmSelect, { target: { value: 'Firm1' } });
    });

    await waitFor(() => {
      expect(memberFirmSelect).toBeInTheDocument('Firm1');
    });
  });
  it('Should update Received From value on change', async () => {
    render(<BusinessRelationshipForm />);
    const receivedFromInput = screen.getByTestId('receivedFromInput');
    await waitFor(() => {
      fireEvent.change(receivedFromInput, {
        target: { value: 'test@gmail.com' },
      });
    });

    await waitFor(() => {
      expect(receivedFromInput).toBeInTheDocument('test@gmail.com');
    });
  });
  it('Should update Processed By Input value on change', async () => {
    render(<BusinessRelationshipForm />);
    const processedByInput = screen.getByTestId('processedByInput');
    await waitFor(() => {
      fireEvent.change(processedByInput, {
        target: { value: 'User1' },
      });
    });

    await waitFor(() => {
      expect(processedByInput).toBeInTheDocument('User1');
    });
  });
  it('Should update Received Date value on change', async () => {
    render(<BusinessRelationshipForm />);
    const receivedDate = screen.getByTestId('receivedDate');
    await waitFor(() => {
      fireEvent.change(receivedDate, {
        target: { value: new Date().toISOString().split('T')[0] },
      });
    });

    await waitFor(() => {
      expect(receivedDate).toBeInTheDocument(
        new Date().toISOString().split('T')[0]
      );
    });
  });
});
