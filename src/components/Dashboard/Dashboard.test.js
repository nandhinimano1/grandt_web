import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '.';

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    render(<Dashboard />, { wrapper: MemoryRouter });
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('toggles the drawer on menu icon click', () => {
    render(<Dashboard />, { wrapper: MemoryRouter });
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);

    const drawer = screen.getByRole('presentation');
    expect(drawer).toBeVisible();
  });

  it('displays the username after timeout', async () => {
    render(<Dashboard />, { wrapper: MemoryRouter });
    expect(await screen.findByText('Manoj Yadav')).toBeInTheDocument();
  });
});
