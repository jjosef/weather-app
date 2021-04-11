require('dotenv').config();

module.exports = {
  OPEN_WEATHER_API_URI: process.env.OPEN_WEATHER_API_URI || 'https://api.openweathermap.org/data/2.5/weather',
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY || ''
}