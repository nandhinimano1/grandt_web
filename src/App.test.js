import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dashboard component', () => {
  render(<App />);
  expect(screen.getByTestId('dashboard')).toBeInTheDocument();
});
