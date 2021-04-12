import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('the app renders', () => {
  render(<App />);
  const title = screen.getByText(/Weather Party!/i);
  expect(title).toBeInTheDocument();
});
