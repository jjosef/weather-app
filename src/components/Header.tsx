import { useWeather } from './WeatherProvider';

export function Header() {
  const weather = useWeather();

  return (
    <header>
      <span>Weather Party!</span>
      <span>Toggle Units</span>
    </header>
  )
}
