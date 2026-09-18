// src/components/MovieCard.js
import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, PixelRatio } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';
import { getResponsivePosterUrl, POSTER_ASPECT_RATIO } from '../services/movieUtils';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteButton from './FavoriteButton';

export default function MovieCard({ movie, onPress, cardWidth = 120 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const posterHeight = cardWidth * POSTER_ASPECT_RATIO;
  const posterTargetPx = PixelRatio.getPixelSizeForLayoutSize(cardWidth);
  const posterUrl = getResponsivePosterUrl(movie.poster_path, posterTargetPx);

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View>
        <Image
          style={[styles.poster, { width: cardWidth, height: posterHeight }]}
          source={{ uri: posterUrl }}
        />
        <FavoriteButton
          active={isFavorite(movie.id)}
          onPress={() => toggleFavorite(movie)}
          size={18}
          style={styles.favoriteButton}
        />
      </View>
      <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
      <Text style={styles.year}>{movie.release_date?.slice(0, 4)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { margin: 8 },
  poster: { borderRadius: 10, backgroundColor: colors.surfaceAlt },
  favoriteButton: { position: 'absolute', top: 6, right: 6 },
  title: { fontFamily: typography.bodySemiBold, fontSize: 14, color: colors.textPrimary, marginTop: 6 },
  year: { fontFamily: typography.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
