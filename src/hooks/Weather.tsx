import { get } from 'lodash';
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { GooglePlaces } from '../services/google-places';
import { IOpenWeatherResponse, OpenWeather } from '../services/open-weather';
import { useNotifier } from './Notifier';

type WeatherContext = {
  locationValue: string;
  locationSearch: Array<LocationSearch>;
  weather: IOpenWeatherResponse | null;
  units: string;
  updateLocation: (val: string, locationSelected?: boolean) => void;
  updateLocationSearch: (val: Array<LocationSearch>) => void;
  updateWeather: (val: IOpenWeatherResponse) => void;
  updateUnits: (val: string) => void;
  isLoadingLocation: MutableRefObject<boolean>;
  isLoadingWeather: MutableRefObject<boolean>;
};

type LocationSearch = {
  description: string;
};

const weatherContext = createContext<Partial<WeatherContext>>({});

export function useWeather() {
  return useContext(weatherContext);
}

export function WeatherProvider({ children }: { children: ReactNode }) {
  const weather = useWeatherProvider();
  return (
    <weatherContext.Provider value={weather}>
      {children}
    </weatherContext.Provider>
  );
}

function useWeatherProvider() {
  const notifier = useNotifier();
  const [locationValue, setLocationValue] = useState('');
  const [locationSearch, setLocationSearch] = useState<Array<LocationSearch>>(
    []
  );
  const [weather, setWeather] = useState<IOpenWeatherResponse | null>(null);
  const [units, setUnits] = useState('imperial');

  const isLoadingLocation = useRef(false);
  const isLoadingWeather = useRef(false);
  const isLocationSelected = useRef(false);
  const unitsChanged = useRef(false);

  function updateLocation(val: string, locationSelected: boolean = false) {
    if (locationSelected) {
      isLocationSelected.current = true;
      setLocationSearch([]);
      setWeather(null);
    }
    setLocationValue(val);
  }

  function updateLocationSearch(val: Array<LocationSearch>) {
    setLocationSearch(val);
  }

  function updateWeather(val: IOpenWeatherResponse) {
    setWeather(val);
  }

  function updateUnits(val: string) {
    unitsChanged.current = true;
    setUnits(val);
  }

  useEffect(
    () => {
      if (weather && unitsChanged.current) {
        unitsChanged.current = false;
      } else {
        unitsChanged.current = false;
        if (!isLocationSelected.current) {
          return;
        }

        if (isLoadingWeather.current) {
          return;
        }

        if (weather) {
          return;
        }
      }

      async function loadWeather() {
        try {
          const result = await new OpenWeather().query({
            q: locationValue,
            units: units
          });
          updateWeather(result.body as IOpenWeatherResponse);
          isLoadingWeather.current = false;
        } catch (err) {
          console.log(err);
          isLoadingWeather.current = false;
          let message =
            'An error occurred loading the weather. If this persists contact support.';
          if (err.status === 404) {
            message = 'Location not found. Try something more generic.';
          }
          notifier.addAlert({ message, className: 'error' });
          // TODO: notification handler
        }
      }

      isLoadingWeather.current = true;

      loadWeather();
    },
    [locationValue, weather, units]
  );

  useEffect(
    () => {
      if (isLocationSelected.current) {
        isLocationSelected.current = false;
        return;
      }
      if (locationValue.length < 3) {
        setLocationSearch([]);
        return;
      }
      if (isLoadingLocation.current || isLoadingWeather.current) {
        return;
      }

      async function loadPlaces() {
        try {
          const result = await new GooglePlaces().query(locationValue);
          updateLocationSearch(
            get(result, 'body.predictions', []).map((p: LocationSearch) => ({
              description: p.description
            }))
          );
          isLoadingLocation.current = false;
        } catch (err) {
          console.log(err);
          isLoadingLocation.current = false;
          notifier.addAlert({
            message:
              'An error occurred getting location listings, if it persists contact support.',
            className: 'error'
          });
          // TODO: notification handler
        }
      }

      isLoadingLocation.current = true;

      loadPlaces();
    },
    [locationValue]
  );

  return {
    locationValue,
    locationSearch,
    weather,
    units,
    isLoadingLocation,
    isLoadingWeather,
    updateLocation,
    updateLocationSearch,
    updateWeather,
    updateUnits
  };
}
