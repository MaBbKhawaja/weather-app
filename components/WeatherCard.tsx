import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  icon: any;
  winddirection: number,
  windspeed, number
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  condition,
  icon,
  windspeed,
  winddirection
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.flex}>
        <View>
          <Text style={styles.temp}>{temperature}°</Text>
          <Text style={styles.condition}>{condition}</Text>
        </View>
        <View>
          <MaterialCommunityIcons name={icon} style={styles.icon}  size={55} color={icon==='weather-sunny'?'#FC9601':'#20A4EF'} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.city}>{city}</Text>
        <View style={styles.wind}>
          <View style={styles.windLogo}>
            <MaterialIcons name="air" size={20} color="black" />
            <Text style={styles.city}>{winddirection}°</Text>
          </View>
          <View style={styles.windLogo}>
            <MaterialIcons name="wind-power" size={20} color="black" />
            <Text style={styles.city}>{windspeed}km/h</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#ECF0F1',
    borderRadius: 30,
    padding: 20,
    width: 350,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  wind:{
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  },
  windLogo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#222',
  },
  condition: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  icon: {
    width: 70,
    height: 70,
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  city: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default WeatherCard;
