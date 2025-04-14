import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import WeatherCard from '../components/WeatherCard';
import NetInfo from '@react-native-community/netinfo';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { cities } from '../constants/cities';

const mapWeatherCodeToCondition = (weatherCode: number) => {
  if (weatherCode === 0) return 'clear';
  if (weatherCode === 1 || weatherCode === 2) return 'partly cloudy';
  if (weatherCode === 3) return 'cloudy';
  if (weatherCode === 61 || weatherCode === 63) return 'rain';
  if (weatherCode === 65) return 'heavy-rain';
  if (weatherCode === 71 || weatherCode === 73) return 'snow';
  return 'clear';
};


const getBackgroundImage = (condition: string) => {
  if (condition === 'clear') return 'weather-sunny';
  if (condition === 'partly-cloudy') return 'weather-partly-cloudy';
  if (condition === 'cloudy') return 'weather-cloudy';
  if (condition === 'rain') return 'weather-rainy';
  if (condition === 'heavy-rain') return 'heavy-rain';
  if (condition === 'snow') return 'weather-snow';
  return 'weather-sunny';
};
const backgroundImages: { [key: string]: any } = {
  'weather-sunny': require('../assets/weather-sunny.gif'),
  'weather-partly-cloudy': require('../assets/weather-partly-cloudy.gif'),
  'weather-cloudy': require('../assets/weather-cloudy.gif'),
  'weather-rainy': require('../assets/weather-rainy.gif'),
  'heavy-rain': require('../assets/weather-lightning-rainy.gif'),
  'weather-snow': require('../assets/weather-snow.gif'),
};

const fetchWeather = async (city) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const { temperature, weathercode, winddirection, windspeed } = data?.current_weather;
    
    const condition = mapWeatherCodeToCondition(weathercode);
    return { temperature, condition, winddirection, windspeed };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};


export default function WeatherScreen() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weather, setWeather] = useState({ temperature: 0, condition: 'clear',winddirection: 0, windspeed:0 });
  const [error, setError] = useState('');
  const { location, errorMsg: locationError } = useCurrentLocation();


  const backgroundImage = getBackgroundImage(weather.condition);
  useEffect(() => {
    const loadWeather = async () => {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        setError('No internet connection. Please check your connection.');
        return;
      }
  
      try {
        if (selectedCity.name === 'Current Location' && location) {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;
          const response = await fetch(url);
          const data = await response.json();
          const { temperature, weathercode, winddirection, windspeed } = data.current_weather;
  
          const condition = mapWeatherCodeToCondition(weathercode);
          setWeather({ temperature, condition, winddirection, windspeed });
          setError('');
        } else {
          const weatherData = await fetchWeather(selectedCity);
          setWeather(weatherData);
          setError('');
        }
      } catch {
        setError('Failed to load weather data. Please try again later.');
      }
    };
  
    loadWeather();
  }, [selectedCity, location]);
  

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImages[backgroundImage]} style={styles.backgroundImage}>
        <View style={styles.stickyHeader}>
          <Text style={styles.headerText}>Weather App</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <WeatherCard
              temperature={weather?.temperature}
              condition={weather?.condition}
              city={selectedCity.name}
              winddirection={weather?.winddirection} 
              windspeed={weather?.windspeed}
              icon={getBackgroundImage(weather?.condition)}
            />
          )}

          <View style={styles.citySelector}>
            <View style={styles.cityGrid}>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city.name}
                  style={styles.cityCard}
                  onPress={async () => {
                    setSelectedCity(city);
                    const weatherData = await fetchWeather(city);
                    setWeather(weatherData);
                    setError('');
                  }}
                >
                  <Text style={styles.cityCardText}>{city.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,  // Elevation for Android devices
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  citySelector: {
    marginTop: 30,
    width: '90%',
  },
  selectorLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cityCard: {
    backgroundColor: '#D14009',
    
    padding: 20,
    borderRadius:20,
    borderTopEndRadius:0,
    borderBottomLeftRadius:0,
    margin: 5,
    width: '40%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  cityCardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
