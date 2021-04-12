import { get } from 'lodash';
import { IconMap } from '../constants/icons';
import { DISTANCE, WIND } from '../constants/systems';
import { Icon } from './Icon';
import { MessageGenerator } from './MessageGenerator';
import { useWeather } from '../hooks/Weather';
import classes from './WeatherCard.module.css';

export function Temperature({
  value,
  units,
  message = 'Currently',
}: {
  value: number;
  units: string | undefined;
  message?: string;
}) {
  return (
    <div className={classes.temp}>
      <span>
        {message} {Math.round(value)}
      </span>
      <Icon icon={units === 'imperial' ? 'wi-fahrenheit' : 'wi-celsius'} />
    </div>
  );
}

export function Wind({
  speed,
  deg,
  units = 'imperial',
}: {
  speed: number;
  deg: number;
  units: string | undefined;
}) {
  const windIndex = Math.floor(deg / 22.5);
  const speedMessage = `${Math.round(speed)}${DISTANCE[units]} from ${
    WIND[windIndex]
  }`;
  return (
    <div className={classes.wind}>
      {speed <= 1 ? (
        <span>It's calm out</span>
      ) : (
        <span>Wind is blowing {speedMessage}</span>
      )}
    </div>
  );
}

export function SunRiseSet({
  message,
  time,
  ...rest
}: {
  message: string;
  time: number;
}) {
  const d = new Date(time);
  const timeText = `${d.toTimeString().substr(0, 5)} UTC`;
  return (
    <div className={classes.sunriseset}>
      {message} {timeText}
    </div>
  );
}

export function WeatherCard() {
  const { weather, units } = useWeather();
  let alterClass = '';
  const sunrise = get(weather, 'sys.sunrise', 0) * 1000;
  const sunset = get(weather, 'sys.sunset', 0) * 1000;
  const now = get(weather, 'dt', 0) * 1000;
  if (now >= sunrise - 60 * 60 * 1000 && now <= sunrise + 60 * 60 * 1000) {
    alterClass = classes.early;
  } else if (now >= sunset && now < sunrise - 60 * 60 * 1000) {
    alterClass = classes.late;
  }

  const lastUpdate = new Date(now);

  const cardClasses = `${classes.weatherCard} ${
    weather ? classes.active : ''
  } ${alterClass}`;
  return (
    <div className={cardClasses}>
      <Icon
        className={classes.mainIcon}
        icon={IconMap[get(weather, 'weather[0].icon', 'na')]}
      />
      <MessageGenerator weather={weather} units={units} />
      <div className={classes.tempWrapper}>
        <Temperature value={get(weather, 'main.temp', 75)} units={units} />
        <Temperature
          value={get(weather, 'main.feels_like', 75)}
          units={units}
          message="Feels like"
        />
      </div>
      <Wind
        speed={get(weather, 'wind.speed', 0)}
        deg={get(weather, 'wind.deg', 0)}
        units={units}
      />
      <SunRiseSet message="Sunrise at" time={sunrise} />
      <SunRiseSet message="Sunset at" time={sunset} />
      <div className={classes.lastUpdate}>
        Last updated at {lastUpdate.toTimeString().substr(0, 5)} UTC
      </div>
    </div>
  );
}
