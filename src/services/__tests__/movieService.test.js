// src/services/__tests__/movieService.test.js

// movieService chama axios.create(...) assim que é importado. jest.mock é
// hoisted para o topo do arquivo, mas uma const declarada fora da fábrica
// ainda não teria valor nesse momento — por isso o mock cria o próprio
// "mockGet" internamente e o expõe através do módulo mockado.
jest.mock('axios', () => {
  const mockGet = jest.fn();
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => ({ get: mockGet })),
      __mockGet: mockGet,
    },
  };
});

import axios from 'axios';
import { getPopularMovies, getMovieDetails } from '../movieService';

describe('movieService', () => {
  const mockApi = { get: axios.__mockGet };

  beforeEach(() => {
    mockApi.get.mockReset();
  });

  it('getPopularMovies retorna a lista de filmes vinda da API', async () => {
    const fakeResults = [
      { id: 1, title: 'Filme A' },
      { id: 2, title: 'Filme B' },
    ];
    mockApi.get.mockResolvedValueOnce({ data: { results: fakeResults } });

    const movies = await getPopularMovies();

    expect(mockApi.get).toHaveBeenCalledWith('/movie/popular');
    expect(movies).toEqual(fakeResults);
  });

  it('getPopularMovies lança um erro amigável quando a API falha', async () => {
    mockApi.get.mockRejectedValueOnce(new Error('network error'));

    await expect(getPopularMovies()).rejects.toThrow(
      'Não foi possível carregar os filmes.'
    );
  });

  it('getMovieDetails retorna os dados completos de um filme pelo id', async () => {
    const fakeMovie = { id: 42, title: 'Filme Completo', runtime: 120 };
    mockApi.get.mockResolvedValueOnce({ data: fakeMovie });

    const movie = await getMovieDetails(42);

    expect(mockApi.get).toHaveBeenCalledWith('/movie/42');
    expect(movie).toEqual(fakeMovie);
  });

  it('getMovieDetails lança um erro amigável quando a API falha', async () => {
    mockApi.get.mockRejectedValueOnce(new Error('network error'));

    await expect(getMovieDetails(42)).rejects.toThrow(
      'Não foi possível carregar os detalhes do filme.'
    );
  });
});
