# weather-app
## Weather details include:
- Temperature
- Weather condition
- Wind speed
- Wind direction

## Dynamic backgrounds
- The background image changes dynamically based on the weather condition using themed .gif animations.

## City Selector Grid
- Scrollable grid of popular global cities. Tapping on any city fetches and displays that city’s current weather in the top card.

## Internet Connectivity Check
- @react-native-community/netinfo to check if connected to internet else show a toast message for failed network

## User Location Based Weather
- On launch, the app requests permission to access the user's location and fetches current weather data accordingly