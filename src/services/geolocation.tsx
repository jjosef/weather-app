import { get } from 'lodash';

export const geolocation = (): Promise<
  GeolocationPosition | GeolocationPositionError | null
> => {
  return new Promise((resolve, reject) => {
    if (!get(navigator, 'geolocation')) return reject(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        return resolve(position);
      },
      (err) => {
        return reject(err);
      }
    );
  });
};
