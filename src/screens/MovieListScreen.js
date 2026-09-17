// src/screens/MovieListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';
import colors from '../theme/colors';

const CONTAINER_PADDING = 8;
const CARD_MARGIN = 8;
const MIN_CARD_WIDTH = 120;
const MAX_CARD_WIDTH = 160;
const MAX_COLUMNS = 6;

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowDimensions();

  async function loadMovies() {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={loadMovies} />;

  const availableWidth = width - CONTAINER_PADDING * 2;
  const numColumns = Math.min(
    MAX_COLUMNS,
    Math.max(2, Math.floor(availableWidth / (MIN_CARD_WIDTH + CARD_MARGIN * 2)))
  );
  const cardWidth = Math.min(MAX_CARD_WIDTH, availableWidth / numColumns - CARD_MARGIN * 2);

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            cardWidth={cardWidth}
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: colors.background },
});
