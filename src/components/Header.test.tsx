import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './Header';
import { WeatherProvider } from '../hooks/Weather';

test('renders header', () => {
  render(<Header />);
  const title = screen.getByText(/Weather Party!/);
  expect(title).toBeInTheDocument();
});

test('renders header and checks for the default selected unit', () => {
  render(
    <WeatherProvider>
      <Header />
    </WeatherProvider>
  );
  const units = screen.getByLabelText(/Imperial/);
  expect(units).toHaveAttribute('checked');
  expect(units).toBeChecked();
});

test('renders header and clicks metric and checks for the correct unit', () => {
  render(
    <WeatherProvider>
      <Header />
    </WeatherProvider>
  );
  const units = screen.getByLabelText(/Imperial/);
  const checked = screen.getByLabelText(/Metric/);
  fireEvent.click(checked);
  expect(units).not.toBeChecked();
  expect(checked).toBeChecked();
});