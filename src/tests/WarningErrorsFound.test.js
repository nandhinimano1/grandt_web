import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import WarningsErrorsFound from '../components/ResultSummary/WarningsErrorsFound';

describe('WarningsErrorsFound', () => {
  const warningsErrors = [
    { code: 'W01', message: 'Warning 1' },
    { code: 'E01', message: 'Error 1' },
  ];
  const mockOnSelect = jest.fn();

  it('should render the component with the list of warnings and errors', () => {
    render(
      <WarningsErrorsFound
        warningsErrors={warningsErrors}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('W01 - Warning 1')).toBeInTheDocument();
    expect(screen.getByText('E01 - Error 1')).toBeInTheDocument();
  });

  it('should call onSelect with the selected warning/error when clicked', () => {
    render(
      <WarningsErrorsFound
        warningsErrors={warningsErrors}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByText('W01 - Warning 1'));
    expect(mockOnSelect).toHaveBeenCalledWith(warningsErrors[0]);

    fireEvent.click(screen.getByText('E01 - Error 1'));
    expect(mockOnSelect).toHaveBeenCalledWith(warningsErrors[1]);
  });
});
