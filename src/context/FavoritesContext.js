// src/context/FavoritesContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { loadFavorites, saveFavorites } from '../services/favoritesService';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // Evita que a leitura inicial (assíncrona) do AsyncStorage sobrescreva um
  // toggle que o usuário já tenha feito antes dela terminar de resolver.
  const didInteractRef = useRef(false);

  useEffect(() => {
    loadFavorites().then((stored) => {
      if (!didInteractRef.current) {
        setFavorites(stored);
      }
      setLoaded(true);
    });
  }, []);

  function isFavorite(movieId) {
    return isFavoriteIn(favorites, movieId);
  }

  function toggleFavorite(movie) {
    didInteractRef.current = true;
    setFavorites((current) => {
      const next = isFavoriteIn(current, movie.id)
        ? current.filter((favorite) => favorite.id !== movie.id)
        : [
            ...current,
            {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
            },
          ];
      saveFavorites(next);
      return next;
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loaded, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

function isFavoriteIn(list, movieId) {
  return list.some((movie) => movie.id === movieId);
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites precisa ser usado dentro de um FavoritesProvider');
  }
  return context;
}
