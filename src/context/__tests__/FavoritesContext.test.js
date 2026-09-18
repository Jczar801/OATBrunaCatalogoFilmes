// src/context/__tests__/FavoritesContext.test.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';

const mockMovie = {
  id: 7,
  title: 'Filme Favorito',
  poster_path: '/poster.jpg',
  release_date: '2025-01-01',
};

function TestConsumer() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  return (
    <TouchableOpacity testID="toggle" onPress={() => toggleFavorite(mockMovie)}>
      <Text>{isFavorite(mockMovie.id) ? 'favoritado' : 'não favoritado'}</Text>
      <Text testID="count">{favorites.length}</Text>
    </TouchableOpacity>
  );
}

describe('FavoritesContext', () => {
  it('adiciona e remove um filme dos favoritos', async () => {
    const { getByTestId, getByText } = render(
      <FavoritesProvider>
        <TestConsumer />
      </FavoritesProvider>
    );

    await waitFor(() => expect(getByText('não favoritado')).toBeTruthy());

    fireEvent.press(getByTestId('toggle'));
    await waitFor(() => expect(getByText('favoritado')).toBeTruthy());
    expect(getByTestId('count').props.children).toBe(1);

    fireEvent.press(getByTestId('toggle'));
    await waitFor(() => expect(getByText('não favoritado')).toBeTruthy());
    expect(getByTestId('count').props.children).toBe(0);
  });
});
