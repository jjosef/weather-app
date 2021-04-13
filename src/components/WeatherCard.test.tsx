import { render, screen } from '@testing-library/react';
import { DISTANCE, WIND } from '../constants/systems';
import { SunRiseSet, Temperature, WeatherCard, Wind } from './WeatherCard';

test('renders weather card successfully', () => {
  render(<WeatherCard />);
});

test('renders Temperature successfully', () => {
  render(<Temperature value={75} units="imperial" />);

  const temp = screen.getByText('Currently 75');
  expect(temp).toBeInTheDocument();
});

test('renders Wind successfully', () => {
  render(<Wind speed={12} deg={220} units="imperial" />);

  const windIndex = Math.floor(220 / 22.5);
  const speedMessage = `12${DISTANCE['imperial']} from ${WIND[windIndex]}`;
  const wind = screen.getByText(`Wind is blowing ${speedMessage}`);
  expect(wind).toBeInTheDocument();
});

test('renders Wind as calm', () => {
  render(<Wind speed={0.8} deg={220} units="imperial" />);

  const wind = screen.getByText(`It's calm out`);
  expect(wind).toBeInTheDocument();
});

test('renders SunRiseSet successfully', () => {
  render(<SunRiseSet message="I guess it is" time={1519129853500} />);

  const setTime = screen.getByText('I guess it is 12:30 local time');
  expect(setTime).toBeInTheDocument();
});
