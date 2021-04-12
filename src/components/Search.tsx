import { useWeather } from '../hooks/Weather';
import classes from './Search.module.css';

export function Search() {
  const { locationValue, locationSearch, weather, updateLocation } = useWeather();
  const acClasses = `${classes.autocomplete} ${locationSearch?.length ? classes.active : ''}`
  return (
    <div className={classes.wrapper + ` ${weather ? 'active' : ''}`}>
      <input 
        className={classes.search}
        name="locationValue" 
        value={locationValue} 
        placeholder="Enter a location name or zipcode"
        autoComplete="off"
        onChange={(event) => {
          // normally i'd create a form component to manage this type of stuff but since it is so basic, not bothering.
          const { target: { value } } = event;
          updateLocation?.(value);
        }} 
      />
      <div className={acClasses}>
        { locationSearch?.map((loc, i) => (
          <div key={i} className={classes.acitem} onClick={() => { updateLocation?.(loc.description, true) }}>{loc.description}</div>
        ))}
      </div>
    </div>
  )
}