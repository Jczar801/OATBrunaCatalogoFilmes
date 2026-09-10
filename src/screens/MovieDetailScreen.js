// src/screens/MovieDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getMovieDetails } from '../services/movieService';

export default function MovieDetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadDetails() {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetails();
  }, [movieId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={loadDetails} />;

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.info}>{movie.release_date} • {movie.runtime} min</Text>
      <Text style={styles.genres}>
        {movie.genres?.map((g) => g.name).join(', ')}
      </Text>
      <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  poster: { width: '100%', height: 400, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  info: { fontSize: 14, color: '#666', marginTop: 4 },
  genres: { fontSize: 14, marginTop: 4 },
  rating: { fontSize: 16, marginTop: 8 },
  overview: { fontSize: 14, marginTop: 12, lineHeight: 20 },
});
