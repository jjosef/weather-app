# Weather App server component

The purpose of this is a simple proxy to make calls to the Open Weather API. It was unclear if their API keys are meant to be public, and offers no hostname restrictions so it seemed like a good idea not to publish it in the website package.

Setup is simple, just `cp .env-template .env` and set your `OPEN_WEATHER_API_KEY` from [openweathermap.org](https://openweathermap.org/)

Run the server:

`npm start`

# Deploying

Deployments are using Google App Engine and Github Actions to inject the secrets into the environment
