export type SystemProp = {
  [key: string]: string | string[] | object;
};

export const TEMP: SystemProp = {
  imperial: 'Fahrenheit',
  metric: 'Celcius'
};

export const DISTANCE: SystemProp = {
  imperial: 'mi/hr',
  metric: 'm/s'
};

export const WIND = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N'
];
