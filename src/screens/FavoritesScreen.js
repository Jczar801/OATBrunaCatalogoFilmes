// src/screens/FavoritesScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import { useFavorites } from '../context/FavoritesContext';
import colors from '../theme/colors';

export default function FavoritesScreen({ navigation }) {
  const { favorites, loaded } = useFavorites();

  if (!loaded) {
    return <Loading />;
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="heart-outline"
          title="Nenhum favorito ainda"
          message='Toque no ícone de coração em um filme para adicioná-lo aos favoritos.'
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MovieGrid
        movies={favorites}
        onPressMovie={(movie) => navigation.navigate('MovieDetail', { movieId: movie.id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: colors.background },
});
