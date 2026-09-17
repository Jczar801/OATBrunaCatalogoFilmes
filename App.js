// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import BackButton from './src/components/BackButton';
import Loading from './src/components/Loading';
import colors from './src/theme/colors';
import typography from './src/theme/typography';

const Stack = createNativeStackNavigator();

// Mapeia cada tela para uma URL própria (ex: /filme/123), para que o
// histórico do navegador (setas de voltar/avançar) funcione na versão web.
const linking = {
  prefixes: [],
  config: {
    screens: {
      MovieList: '',
      MovieDetail: 'filme/:movieId',
    },
  },
};

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.gold,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return <Loading />;

  return (
    <NavigationContainer theme={navigationTheme} linking={linking}>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="MovieList"
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontFamily: typography.headingSemiBold },
          headerShadowVisible: false,
        }}
      >
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
