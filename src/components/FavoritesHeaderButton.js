// src/components/FavoritesHeaderButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function FavoritesHeaderButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Favorites')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Ionicons name="heart" size={22} color={colors.gold} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { marginRight: 12 },
});
