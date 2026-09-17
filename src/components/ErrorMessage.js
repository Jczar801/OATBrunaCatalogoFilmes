// src/components/ErrorMessage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry} testID="retry-button" activeOpacity={0.8}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: colors.background },
  text: { fontFamily: typography.body, color: colors.error, textAlign: 'center', fontSize: 15 },
  button: { marginTop: 16, backgroundColor: colors.gold, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { fontFamily: typography.bodySemiBold, color: colors.onGold, fontSize: 14 },
});
