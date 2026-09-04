// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import BackButton from './src/components/BackButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{ title: 'Filmes Populares' }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{ title: 'Detalhes', headerLeft: () => <BackButton /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
