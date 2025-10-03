import { getDb } from '@/lib/db';
import { calculateDistanceKm } from '@/lib/geo';
import { computeScore } from '@/lib/repositories/utils';
import { isOpen } from '@/lib/schedule';
import { getReviewsByTasca } from './reviewsRepo';

export type Tasca = {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  price_level: number;
  has_menu_of_day: number;
  accepts_cards: number;
  veg_options: number;
  gluten_free: number;
  tags_csv: string;
  phone: string | null;
  website: string | null;
  menu_url: string | null;
  schedule_json: string;
  created_at: string;
  updated_at: string;
  pending_sync: number;
};

export type TascaWithScore = Tasca & {
  score: number;
  comida: number;
  ambiente: number;
  preco_justo: number;
  reviews_count: number;
  distanceKm?: number;
};

export const listTascas = async (options?: {
  query?: string;
  filters?: {
    barato?: boolean;
    menu?: boolean;
    petiscos?: boolean;
    comidaCaseira?: boolean;
    abertoAgora?: boolean;
  };
  location?: { lat: number; lng: number } | null;
  scheduleCheck?: Date;
}) => {
  const db = await getDb();
  let sql = 'SELECT * FROM tascas';
  const params: unknown[] = [];
  if (options?.query) {
    sql += ' WHERE name LIKE ? OR city LIKE ? OR address LIKE ?';
    const wildcard = `%${options.query}%`;
    params.push(wildcard, wildcard, wildcard);
  }

  const rows = await db.getAllAsync<Tasca>(sql, params);
  const now = options?.scheduleCheck ?? new Date();
  const results: TascaWithScore[] = [];

  for (const row of rows) {
    const reviews = await getReviewsByTasca(row.id);
    const scoreInfo = computeScore(reviews);
    const distanceKm = options?.location
      ? calculateDistanceKm(options.location.lat, options.location.lng, row.lat, row.lng)
      : undefined;

    results.push({
      ...row,
      ...scoreInfo,
      distanceKm,
    });
  }

  let filtered = results;
  if (options?.filters) {
    const { barato, menu, petiscos, comidaCaseira, abertoAgora } = options.filters;
    filtered = filtered.filter((tasca) => {
      if (barato && tasca.price_level !== 1) return false;
      if (menu && tasca.has_menu_of_day !== 1) return false;
      const tags = tasca.tags_csv.toLowerCase();
      if (petiscos && !tags.includes('petisco')) return false;
      if (comidaCaseira && !tags.includes('caseir') && !tags.includes('tradicional')) {
        return false;
      }
      if (abertoAgora) {
        const schedule = JSON.parse(tasca.schedule_json);
        if (!isOpen(schedule, now)) return false;
      }
      return true;
    });
  }

  if (options?.location) {
    filtered.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  } else {
    filtered.sort((a, b) => b.score - a.score);
  }

  return filtered;
};

export const getTascaById = async (id: string, location?: { lat: number; lng: number } | null) => {
  const db = await getDb();
  const tasca = await db.getFirstAsync<Tasca>('SELECT * FROM tascas WHERE id = ?', [id]);
  if (!tasca) return null;
  const reviews = await getReviewsByTasca(id);
  const scoreInfo = computeScore(reviews);
  const distanceKm = location
    ? calculateDistanceKm(location.lat, location.lng, tasca.lat, tasca.lng)
    : undefined;

  return {
    ...tasca,
    ...scoreInfo,
    distanceKm,
    reviews,
  };
};

export const addTasca = async (data: {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  price_level: number;
  has_menu_of_day: number;
  accepts_cards: number;
  veg_options: number;
  gluten_free: number;
  tags_csv: string;
  phone: string | null;
  website: string | null;
  menu_url: string | null;
  schedule_json: string;
  pending_sync: number;
}) => {
  const db = await getDb();
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO tascas (
      id, name, address, city, lat, lng, price_level, has_menu_of_day,
      accepts_cards, veg_options, gluten_free, tags_csv, phone, website, menu_url,
      schedule_json, created_at, updated_at, pending_sync
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.id,
      data.name,
      data.address,
      data.city,
      data.lat,
      data.lng,
      data.price_level,
      data.has_menu_of_day,
      data.accepts_cards,
      data.veg_options,
      data.gluten_free,
      data.tags_csv,
      data.phone,
      data.website,
      data.menu_url,
      data.schedule_json,
      now,
      now,
      data.pending_sync,
    ]
  );
};

export const searchSuggestions = async (query: string) => {
  const db = await getDb();
  const wildcard = `%${query}%`;
  return db.getAllAsync<{ id: string; name: string }>(
    'SELECT id, name FROM tascas WHERE name LIKE ? LIMIT 10',
    [wildcard]
  );
};
