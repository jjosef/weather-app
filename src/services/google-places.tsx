import request, { Response } from 'superagent';

export class GooglePlaces {
  host: string;

  constructor(host = process.env.REACT_APP_API_HOST || '') {
    this.host = host;
  }

  query(input: string): Promise<Response> {
    return request
      .get(`${this.host}/places`)
      .query({ input, types: '(regions)' });
  }

  geoquery(lat: number, lon: number): Promise<Response> {
    return request
      .get(`${this.host}/places`)
      .query({ input: '', types: '(regions)', location: `${lat},${lon}` });
  }
}
