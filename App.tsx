import React from 'react';
import WeatherScreen from './screens/WeatherScreen';

export default function App() {
  const weather = {
    temperature: 25, 
    condition: 'clear', 
  };

  const city = 'New York';

  return <WeatherScreen weather={weather} city={city} />;
}
