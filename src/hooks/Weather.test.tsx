import { render, screen } from '@testing-library/react';
import { WeatherProvider } from './Weather';

test('renders weather provider', () => {
  render(
    <WeatherProvider>
      <div></div>
    </WeatherProvider>
  );
});
