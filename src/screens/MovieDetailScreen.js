// src/screens/MovieDetailScreen.js
import React, { useEffect, useState } from 'react';
import { Text, Image, ScrollView, StyleSheet, useWindowDimensions, PixelRatio } from 'react-native';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getMovieDetails } from '../services/movieService';
import { formatReleaseDate, getResponsivePosterUrl } from '../services/movieUtils';
import colors from '../theme/colors';
import typography from '../theme/typography';

const CONTAINER_PADDING = 16;
const POSTER_ASPECT_RATIO = 1.5; // pôsteres do TMDb seguem a proporção 2:3

export default function MovieDetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowDimensions();

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

  const posterWidth = width - CONTAINER_PADDING * 2;
  const posterHeight = posterWidth * POSTER_ASPECT_RATIO;
  const posterTargetPx = PixelRatio.getPixelSizeForLayoutSize(posterWidth);
  const posterUrl = getResponsivePosterUrl(movie.poster_path, posterTargetPx);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={[styles.poster, { width: posterWidth, height: posterHeight }]}
        source={{ uri: posterUrl }}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.info}>{formatReleaseDate(movie.release_date)} • {movie.runtime} min</Text>
      <Text style={styles.genres}>
        {movie.genres?.map((g) => g.name).join(', ')}
      </Text>
      <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: CONTAINER_PADDING, backgroundColor: colors.background },
  poster: { borderRadius: 12, backgroundColor: colors.surfaceAlt },
  title: { fontFamily: typography.heading, fontSize: 22, color: colors.textPrimary, marginTop: 16 },
  info: { fontFamily: typography.body, fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  genres: { fontFamily: typography.bodyMedium, fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  rating: { fontFamily: typography.bodySemiBold, fontSize: 16, color: colors.gold, marginTop: 8 },
  overview: { fontFamily: typography.body, fontSize: 17, color: colors.textPrimary, marginTop: 12, lineHeight: 26 },
});
