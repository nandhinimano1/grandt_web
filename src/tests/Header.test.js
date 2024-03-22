import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  const mockHandleDrawerToggle = jest.fn();
  const mockHandleOpenUserMenu = jest.fn();
  const mockHandleCloseUserMenu = jest.fn();

  const userinfo = {
    username: 'John Doe',
    role: 'Administrator',
  };

  it('renders the company name', () => {
    render(
      <Header
        handleDrawerToggle={mockHandleDrawerToggle}
        userinfo={userinfo}
        anchorElUser={null}
        handleOpenUserMenu={mockHandleOpenUserMenu}
        handleCloseUserMenu={mockHandleCloseUserMenu}
      />
    );
    expect(screen.getByText('Grant Thornton')).toBeInTheDocument();
  });

  it('renders the user information', () => {
    render(
      <Header
        handleDrawerToggle={mockHandleDrawerToggle}
        userinfo={userinfo}
        anchorElUser={null}
        handleOpenUserMenu={mockHandleOpenUserMenu}
        handleCloseUserMenu={mockHandleCloseUserMenu}
      />
    );
    expect(screen.getByText(userinfo.username)).toBeInTheDocument();
    expect(screen.getByText(userinfo.role)).toBeInTheDocument();
  });

  it('opens the user menu when the avatar is clicked', () => {
    render(
      <Header
        handleDrawerToggle={mockHandleDrawerToggle}
        userinfo={userinfo}
        anchorElUser={null}
        handleOpenUserMenu={mockHandleOpenUserMenu}
        handleCloseUserMenu={mockHandleCloseUserMenu}
      />
    );
    fireEvent.click(screen.getByLabelText('Open settings'));
    expect(mockHandleOpenUserMenu).toHaveBeenCalled();
  });
});
