import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { IOpenWeatherResponse } from '../services/open-weather';
import classes from './WeatherCard.module.css';

export type WeatherMessage = {
  main?: string;
  tempCompare?: string;
  imperial?: number;
  metric?: number;
  message: string;
};

export const OVERALLWEATHER: WeatherMessage[] = [
  {
    tempCompare: '>',
    imperial: 85,
    metric: 30,
    message: "Looks like it's getting hot out there!",
  },
  {
    main: 'Clear',
    tempCompare: '>',
    imperial: 65,
    metric: 18,
    message: 'Get outta the house! Its gorgeous!',
  },
  {
    main: 'Rain',
    message: 'Sounds like a good day to chill.',
  },
  {
    main: 'Thunderstorm',
    message: 'Ahhhhhhh!',
  },
  {
    tempCompare: '<',
    imperial: 40,
    metric: 4,
    message: 'Brrrrr! Bundle up today!',
  },
  {
    main: 'Snow',
    message: 'Get out and make yourself a snowman!',
  },
];

export function MessageGenerator({
  weather,
  units,
}: {
  weather: IOpenWeatherResponse | null | undefined;
  units: string | undefined;
}) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = OVERALLWEATHER.filter((w: WeatherMessage): boolean => {
      let match = false;
      const tempToCompare = (units === 'imperial' ? w.imperial : w.metric) || 0;
      const mainTemp = get(weather, 'main.temp');
      if (mainTemp && w.tempCompare === '>' && tempToCompare > 0) {
        if (mainTemp > tempToCompare) {
          if (w.main && w.main === get(weather, 'weather[0].main')) {
            match = true;
          } else if (!w.main) {
            match = true;
          }
        }
      } else if (mainTemp && w.tempCompare === '<' && tempToCompare > 0) {
        if (mainTemp < tempToCompare) {
          if (w.main && w.main === get(weather, 'weather[0].main')) {
            match = true;
          } else if (!w.main) {
            match = true;
          }
        }
      }

      if (
        !w.tempCompare &&
        w.main &&
        w.main === get(weather, 'weather[0].main')
      ) {
        match = true;
      }

      return match;
    });

    if (options.length) {
      setMessage(options[Math.floor(Math.random() * options.length)].message);
    } else {
      setMessage(get(weather, 'weather[0].main'));
    }
  }, [weather]);

  return (
    <div data-testid="weatherMessage" className={classes.weatherMessage}>
      {message}
    </div>
  );
}
