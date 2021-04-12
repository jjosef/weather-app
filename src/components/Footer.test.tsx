import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('renders footer and contains the correct copyright date', () => {
  render(<Footer />);
  const year = new Date().getUTCFullYear();
  const match = new RegExp(`copyright ${year}`, 'i');
  const copyright = screen.getByText(match);
  expect(copyright).toBeInTheDocument();
});
