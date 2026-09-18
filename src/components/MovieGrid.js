// src/components/MovieGrid.js
// Grade responsiva de filmes reutilizada pela listagem e pelos favoritos:
// calcula o número de colunas e a largura do card a partir da largura da tela.
import React from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import MovieCard from './MovieCard';

const CONTAINER_PADDING = 8;
const CARD_MARGIN = 8;
const MIN_CARD_WIDTH = 120;
const MAX_CARD_WIDTH = 160;
const MAX_COLUMNS = 6;

export default function MovieGrid({ movies, onPressMovie, ListHeaderComponent }) {
  const { width } = useWindowDimensions();
  const availableWidth = width - CONTAINER_PADDING * 2;
  const numColumns = Math.min(
    MAX_COLUMNS,
    Math.max(2, Math.floor(availableWidth / (MIN_CARD_WIDTH + CARD_MARGIN * 2)))
  );
  const cardWidth = Math.min(MAX_CARD_WIDTH, availableWidth / numColumns - CARD_MARGIN * 2);

  return (
    <FlatList
      key={numColumns}
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <MovieCard movie={item} cardWidth={cardWidth} onPress={() => onPressMovie(item)} />
      )}
    />
  );
}
