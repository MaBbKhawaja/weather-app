import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

type LocationType = {
  latitude: number;
  longitude: number;
} | null;

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationType>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  return { location, errorMsg };
};
