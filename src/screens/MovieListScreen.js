// src/screens/MovieListScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { getPopularMovies, searchMovies } from '../services/movieService';
import colors from '../theme/colors';

const SEARCH_DEBOUNCE_MS = 400;

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  async function loadPopularMovies() {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function runSearch(searchQuery) {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(searchQuery);
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function loadForQuery(searchQuery) {
    const trimmedQuery = searchQuery.trim();
    return trimmedQuery ? runSearch(trimmedQuery) : loadPopularMovies();
  }

  useEffect(() => {
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timeoutId = setTimeout(() => runSearch(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [query]);

  function handleChangeQuery(text) {
    setQuery(text);
    if (!text.trim()) {
      loadPopularMovies();
    }
  }

  function retry() {
    loadForQuery(query);
  }

  const searchBar = (
    <SearchBar value={query} onChangeText={handleChangeQuery} />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        {searchBar}
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        {searchBar}
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        {searchBar}
        <EmptyState
          icon="search-outline"
          title="Nenhum filme encontrado"
          message={
            query.trim()
              ? `Não encontramos resultados para "${query.trim()}". Tente buscar por outro título.`
              : 'Não há filmes populares para exibir no momento.'
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MovieGrid
        movies={movies}
        onPressMovie={(movie) => navigation.navigate('MovieDetail', { movieId: movie.id })}
        ListHeaderComponent={searchBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: colors.background },
});
