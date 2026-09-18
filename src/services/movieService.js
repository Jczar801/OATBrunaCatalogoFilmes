// src/services/movieService.js
import axios from 'axios';

// Chave da API do TMDb, lida de uma variável de ambiente (ver .env.example).
// Obtenha a sua em https://www.themoviedb.org/settings/api
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
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

export async function searchMovies(query) {
  try {
    const response = await api.get('/search/movie', { params: { query } });
    return response.data.results;
  } catch (error) {
    throw new Error('Não foi possível buscar os filmes.');
  }
}
