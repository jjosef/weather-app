import { get } from 'lodash';

export const geolocation = (): Promise<GeolocationPosition | null> => {
  return new Promise((resolve, reject) => {
    if (!get(navigator, 'geolocation')) return resolve(null);

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
