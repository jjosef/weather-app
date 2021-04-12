import { ChangeEvent } from 'react';
import { useWeather } from '../hooks/Weather';

export function Header() {
  const { units, updateUnits } = useWeather();

  const handleChangeUnits = (event: ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = event;
    updateUnits?.(value);
  }

  return (
    <header>
      <span className="logo">Weather Party!</span>
      <span className="units">
        <label>
          <input
            type="radio"
            name="units"
            value="imperial"
            checked={units === 'imperial'}
            onChange={handleChangeUnits}
          />
          Imperial
        </label>
        <label>
          <input
            type="radio"
            name="units"
            value="metric"
            checked={units === 'metric'}
            onChange={handleChangeUnits}
          />
          Metric
        </label>
      </span>
    </header>
  );
}
