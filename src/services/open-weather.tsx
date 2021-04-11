import request, { Response } from 'superagent';

type ApiOptions = {
  lat?: number;
  lon?: number;
  units?: string;
  q?: string;
  zip?: string;
};

type Item = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type Main = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

type Clouds = {
  all: number;
};

type Coord = {
  lat: number;
  lon: number;
};

type Sys = {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
};

type Wind = {
  deg: number;
  speed: number;
};

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

  constructor(host = process.env.REACT_APP_API_HOST || '') {
    this.host = host;
  }

  query(args: ApiOptions): Promise<Response> {
    console.log(this.host);
    return request.get(this.host).query(args);
  }
}
