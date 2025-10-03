import assert from 'assert';
import { calculateDistanceKm } from '@/lib/geo';

export const runGeoTests = () => {
  const lisbon = { lat: 38.7223, lng: -9.1393 };
  const porto = { lat: 41.1579, lng: -8.6291 };
  const distance = calculateDistanceKm(lisbon.lat, lisbon.lng, porto.lat, porto.lng);
  assert(distance > 270 && distance < 320, 'Distância Lisboa-Porto deve ficar entre 270km e 320km');

  const same = calculateDistanceKm(lisbon.lat, lisbon.lng, lisbon.lat, lisbon.lng);
  assert(Math.abs(same) < 0.01, 'Distância para o mesmo ponto deve ser ~0');
};
