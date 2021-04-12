import { render, screen } from '@testing-library/react';
import { WeatherCard } from './WeatherCard';

test('renders weather card', () => {
  render(<WeatherCard />);
});
