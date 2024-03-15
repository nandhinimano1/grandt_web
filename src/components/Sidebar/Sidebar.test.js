import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Sidebar from '.';

describe('Sidebar Component', () => {
  const defaultProps = {
    mobileOpen: false,
    handleDrawerToggle: jest.fn(),
    drawerWidth: 240,
  };
  const renderSidebar = (props = {}) => {
    return render(
      <MemoryRouter>
        <Sidebar {...defaultProps} {...props} />
      </MemoryRouter>
    );
  };

  it('renders Sidebar component', () => {
    renderSidebar();
    expect(screen.getByTestId('permanent')).toBeInTheDocument();
  });

  it('contains correct links', () => {
    renderSidebar();
    const onboardLinks = screen.getAllByTestId('onboard-link');
    expect(onboardLinks.length).toBeGreaterThan(0);
    expect(
      onboardLinks.some((link) => link.getAttribute('href') === '/onboard')
    ).toBeTruthy();
  });

  it('toggles visibility based on mobileOpen prop', () => {
    // Initial render with mobileOpen as false
    const { rerender } = renderSidebar({ mobileOpen: false });
    expect(screen.getByTestId('temporary')).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    rerender(
      <MemoryRouter>
        <Sidebar {...defaultProps} mobileOpen={true} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('temporary')).not.toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
