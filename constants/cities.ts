export type City = {
  name: string;
  latitude: number;
  longitude: number;
};

export const cities: City[] = [
  {name: 'Current Location', latitude: undefined, longitude: undefined},
  { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Hong Kong', latitude: 22.3193, longitude: 114.1694 },
  { name: 'Bangkok', latitude: 13.7563, longitude: 100.5018 },
  { name: 'St. Petersburg', latitude: 59.9311, longitude: 30.3609 },
  { name: 'Kiev', latitude: 50.4501, longitude: 30.5234 },
  { name: 'Berlin', latitude: 52.52, longitude: 13.405 },
  { name: 'Dublin', latitude: 53.3498, longitude: -6.2603 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'New York', latitude: 40.7128, longitude: -74.006 },
  { name: 'Mexico City', latitude: 19.4326, longitude: -99.1332 },
];
