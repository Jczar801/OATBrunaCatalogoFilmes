// src/components/__tests__/MovieCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard from '../MovieCard';

const mockMovie = {
  id: 1,
  title: 'Filme de Teste',
  poster_path: '/poster.jpg',
  release_date: '2024-05-10',
};

describe('MovieCard', () => {
  it('renderiza o título e o ano do filme recebido via props (mock)', () => {
    const { getByText } = render(<MovieCard movie={mockMovie} onPress={() => {}} />);

    expect(getByText('Filme de Teste')).toBeTruthy();
    expect(getByText('2024')).toBeTruthy();
  });

  it('chama onPress ao ser tocado', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<MovieCard movie={mockMovie} onPress={onPressMock} />);

    fireEvent.press(getByText('Filme de Teste'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
