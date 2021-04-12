# Weather App server component

The purpose of this is a simple proxy to make calls to the Open Weather API. It was unclear if their API keys are meant to be public, and offers no hostname restrictions so it seemed like a good idea not to publish it in the website package.

Setup is simple, just `cp .env-template .env` and set your `OPEN_WEATHER_API_KEY` from [openweathermap.org](https://openweathermap.org/) and your `GOOGLE_PLACES_API_KEY` from [GCP Console](https://console.cloud.google.com/google/maps-apis/credentials). Note you will need to enable the Places API for your project from the console [here](https://console.cloud.google.com/google/maps-apis/api-list).

Run the server:

`npm start`

# Deploying

Deployments are using GCP Cloud Run and Github Actions.

Deploying manually can be achieved with the following commands:

```
gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/weather-app-api
...
gcloud run deploy weather-app-api --image gcr.io/$GCP_PROJECT_ID/weather-app-api --platform managed --region us-central1 --allow-unauthenticated --set-env-vars "OPEN_WEATHER_API_KEY=$OPEN_WEATHER_API_KEY,GOOGLE_PLACES_API_KEY=$GOOGLE_PLACES_API_KEY"
```