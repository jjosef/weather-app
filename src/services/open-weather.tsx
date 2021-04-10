import superagent, { Response } from 'superagent';

type Item = {
  description: string;
  icon: string;
  id: number;
  main: string;
}

type Main = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number
}

type Clouds = {
  all: number;
}

type Coord = {
  lat: number;
  lon: number;
}

type Sys = {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

type Wind = {
  deg: number;
  speed: number;
}

// basically what a valid response from open weather API should look like
export interface IOpenWeatherResponse {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  name: string;
  sys: Sys;
  weather: Array<Item>;
  wind: Wind;
}

export class OpenWeather {
  host: string;
  apiKey: string;

  constructor (host = 'https://api.openweathermap.org/data/2.5/weather') {
    this.host = host;
    this.apiKey = process.env.REACT_APP_OWM_API_KEY || '';
  }

  query(q: string) : Promise<Response> {
    return superagent
      .get(this.host)
      .query({ q })
      .query({ appid: this.apiKey })
  }

  latlng(lat: number, lon: number) : Promise<Response> {
    return superagent
      .get(this.host)
      .query({ lat, lon })
      .query({ appid: this.apiKey })
  }
}
