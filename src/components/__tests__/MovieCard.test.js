// src/components/__tests__/MovieCard.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MovieCard from '../MovieCard';
import { FavoritesProvider } from '../../context/FavoritesContext';

const mockMovie = {
  id: 1,
  title: 'Filme de Teste',
  poster_path: '/poster.jpg',
  release_date: '2024-05-10',
};

function renderWithFavorites(ui) {
  return render(<FavoritesProvider>{ui}</FavoritesProvider>);
}

describe('MovieCard', () => {
  it('renderiza o título e o ano do filme recebido via props (mock)', () => {
    const { getByText } = renderWithFavorites(<MovieCard movie={mockMovie} onPress={() => {}} />);

    expect(getByText('Filme de Teste')).toBeTruthy();
    expect(getByText('2024')).toBeTruthy();
  });

  it('chama onPress ao ser tocado', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithFavorites(
      <MovieCard movie={mockMovie} onPress={onPressMock} />
    );

    fireEvent.press(getByText('Filme de Teste'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('marca e desmarca o filme como favorito ao tocar no coração', async () => {
    const { getByTestId, UNSAFE_getByProps } = renderWithFavorites(
      <MovieCard movie={mockMovie} onPress={() => {}} />
    );
    const favoriteButton = getByTestId('favorite-button');

    expect(UNSAFE_getByProps({ name: 'heart-outline' })).toBeTruthy();

    fireEvent.press(favoriteButton);
    await waitFor(() => expect(UNSAFE_getByProps({ name: 'heart' })).toBeTruthy());

    fireEvent.press(favoriteButton);
    await waitFor(() => expect(UNSAFE_getByProps({ name: 'heart-outline' })).toBeTruthy());
  });
});
