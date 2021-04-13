import { useWeather } from '../hooks/Weather';
import classes from './Search.module.css';

export function Search() {
  const {
    locationValue,
    locationSearch,
    weather,
    updateLocation,
  } = useWeather();
  const acClasses = `${classes.autocomplete} ${
    locationSearch?.length ? classes.active : ''
  }`;
  return (
    <div className={classes.wrapper + ` ${weather ? 'active' : ''}`}>
      <input
        aria-label="location"
        className={classes.search}
        name="locationValue"
        value={locationValue}
        placeholder="Enter a location name or zipcode"
        autoComplete="off"
        onChange={(event) => {
          // normally i'd create/utilize a component to manage form inputs but since this is so basic,
          // not bothering.
          // plus i get to CSS style.
          const {
            target: { value },
          } = event;
          updateLocation?.(value);
        }}
      />
      <div data-testid="locationSelect" className={acClasses}>
        {locationSearch?.map((loc, i) => (
          <div
            key={i}
            className={classes.acitem}
            onClick={() => {
              updateLocation?.(loc.description, true);
            }}
          >
            {loc.description}
          </div>
        ))}
      </div>
    </div>
  );
}
