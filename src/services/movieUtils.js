// src/services/movieUtils.js

// Pôsteres do TMDb seguem a proporção 2:3 (largura:altura).
export const POSTER_ASPECT_RATIO = 1.5;

export function formatReleaseDate(releaseDate) {
  if (!releaseDate) return '';
  const [year, month, day] = releaseDate.split('-');
  return `${day}/${month}/${year}`;
}

// Tamanhos de pôster disponíveis na API do TMDb.
const POSTER_WIDTHS = [92, 154, 185, 342, 500, 780];

export function getResponsivePosterSize(targetWidth) {
  const width = POSTER_WIDTHS.find((w) => w >= targetWidth);
  return width ? `w${width}` : 'original';
}

export function getResponsivePosterUrl(posterPath, targetWidth) {
  if (!posterPath) return null;
  const size = getResponsivePosterSize(targetWidth);
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}
