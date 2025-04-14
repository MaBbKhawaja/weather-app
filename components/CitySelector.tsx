import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { City } from '../constants/cities';

interface CitySelectorProps {
  cities: City[];
  onSelectCity: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ cities, onSelectCity }) => {
  return (
    <FlatList
      horizontal
      data={cities}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelectCity(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CitySelector;
