require('dotenv').config();

module.exports = {
  OPEN_WEATHER_API_URI:
    process.env.OPEN_WEATHER_API_URI ||
    'https://api.openweathermap.org/data/2.5/weather',
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY || '',
  GOOGLE_PLACES_API_URI:
    process.env.GOOGLE_PLACES_API_URI ||
    'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || ''
};
