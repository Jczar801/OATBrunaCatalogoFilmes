// src/services/favoritesService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@cinelog:favorites';

export async function loadFavorites() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorites(favorites) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
