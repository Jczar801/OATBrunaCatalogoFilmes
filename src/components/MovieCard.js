// src/components/MovieCard.js
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
      />
      <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
      <Text style={styles.year}>{movie.release_date?.slice(0, 4)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 120, margin: 8 },
  poster: { width: 120, height: 180, borderRadius: 8 },
  title: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  year: { fontSize: 12, color: '#666' },
});
