// src/services/__tests__/movieUtils.test.js
import { formatReleaseDate, getResponsivePosterSize, getResponsivePosterUrl } from '../movieUtils';

test('formata data no padrão brasileiro', () => {
  expect(formatReleaseDate('2026-09-10')).toBe('10/09/2026');
});

test('retorna string vazia quando não há data', () => {
  expect(formatReleaseDate(undefined)).toBe('');
});

test('escolhe o menor tamanho do TMDb que cobre a largura pedida', () => {
  expect(getResponsivePosterSize(300)).toBe('w342');
  expect(getResponsivePosterSize(342)).toBe('w342');
  expect(getResponsivePosterSize(600)).toBe('w780');
});

test('usa "original" quando nenhum tamanho pré-definido é largo o suficiente', () => {
  expect(getResponsivePosterSize(1000)).toBe('original');
});

test('monta a URL completa do pôster com o tamanho responsivo', () => {
  expect(getResponsivePosterUrl('/abc.jpg', 300)).toBe(
    'https://image.tmdb.org/t/p/w342/abc.jpg'
  );
});

test('retorna null quando o filme não tem poster', () => {
  expect(getResponsivePosterUrl(null, 300)).toBeNull();
});
