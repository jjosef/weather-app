import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

test('renders an icon', () => {
  render(<Icon icon="wi-day-sunny" />);
  const icon = screen.getByTestId('icon');
  expect(icon).toHaveClass('wi-day-sunny');
});

test('renders an icon with additional className', () => {
  render(<Icon icon="wi-day-sunny" className="additional" />);
  const icon = screen.getByTestId('icon');
  expect(icon).toHaveClass('wi-day-sunny');
  expect(icon).toHaveClass('additional');
});
