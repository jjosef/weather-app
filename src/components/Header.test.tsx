import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders header', () => {
  render(<Header />);
  const title = screen.getByText(/Weather Party!/);
  expect(title).toBeInTheDocument();
});