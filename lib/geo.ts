import { Linking, Platform } from 'react-native';

const EARTH_RADIUS_KM = 6371;

const toRad = (value: number) => (value * Math.PI) / 180;

export const calculateDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};

export const openInMaps = async (lat: number, lng: number, name: string) => {
  const label = encodeURIComponent(name);
  const latLng = `${lat},${lng}`;
  const iosUrl = `http://maps.apple.com/?q=${label}&ll=${latLng}`;
  const googleUrl = `https://maps.google.com/?q=${label}&ll=${latLng}`;
  const geoUrl = `geo:${latLng}?q=${latLng}(${label})`;
  const scheme = Platform.select({ ios: iosUrl, android: geoUrl, default: googleUrl });
  const fallback = Platform.OS === 'android' ? googleUrl : iosUrl;
  const supported = await Linking.canOpenURL(scheme ?? googleUrl);
  if (supported) {
    await Linking.openURL(scheme ?? googleUrl);
  } else {
    await Linking.openURL(fallback);
  }
};
