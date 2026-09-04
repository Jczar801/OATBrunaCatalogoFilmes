// src/services/movieService.js
import axios from 'axios';

const API_KEY = 'ec3f4e409aaaf2e3a44bdd20a80ad8e1'; // pegar em https://www.themoviedb.org/settings/api
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export async function getPopularMovies() {
  try {
    const response = await api.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    throw new Error('Não foi possível carregar os filmes.');
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw new Error('Não foi possível carregar os detalhes do filme.');
  }
}
