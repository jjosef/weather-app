import { createContext, ReactNode, useContext, useState } from 'react';
import { IOpenWeatherResponse } from '../services/open-weather';

const weatherContext = createContext({});

export function useWeather() {
  return useContext(weatherContext);
}

export function WeatherProvider({ children }: { children: ReactNode }) {
  const weather = useWeatherProvider();
  return (
    <weatherContext.Provider value={weather}>
      {children}
    </weatherContext.Provider>
  )
}

function useWeatherProvider() {
  const [locationValue, setLocationValue] = useState('');
  const [weather, setWeather] = useState<IOpenWeatherResponse | null>(null);

  function updateLocation(val: string) {
    setLocationValue(val);
  }

  function updateWeather(val: IOpenWeatherResponse) {
    setWeather(val)
  }

  return {
    locationValue,
    weather,
    updateLocation,
    updateWeather
  }
}
