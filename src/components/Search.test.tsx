import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from './Search';

test('renders search successfully', () => {
  render(<Search />);
});

test('input text successfully', () => {
  render(<Search />);

  const input = screen.getByLabelText('location');
  fireEvent.change(input, { target: { value: 'Charleston, SC' } });
  expect(input.value).toBe('Charleston, SC');
});
