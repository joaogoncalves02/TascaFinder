import { colors } from '@/theme/colors';

type PriceLevel = 1 | 2 | 3;

export const formatPriceLevel = (level: PriceLevel) => {
  return '€'.repeat(level);
};

export const formatDistance = (distanceKm: number) => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
};

export const formatScore = (score: number) => score.toFixed(1);

export const badgeBackground = (active: boolean) =>
  active ? colors.azulejo : colors.bege;

export const badgeText = (active: boolean) =>
  active ? colors.branco : colors.azulejo;

export const capitalize = (text: string) =>
  text
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
