import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { seedInitialData } from './seed';

export type Database = SQLite.SQLiteDatabase;

let dbInstance: Database | null = null;

const migrations = [
  `CREATE TABLE IF NOT EXISTS tascas (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    price_level INTEGER NOT NULL,
    has_menu_of_day INTEGER NOT NULL,
    accepts_cards INTEGER NOT NULL,
    veg_options INTEGER NOT NULL,
    gluten_free INTEGER NOT NULL,
    tags_csv TEXT,
    phone TEXT,
    website TEXT,
    menu_url TEXT,
    schedule_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    pending_sync INTEGER NOT NULL DEFAULT 0
  );`,
  `CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY NOT NULL,
    tasca_id TEXT NOT NULL,
    user_nick TEXT NOT NULL,
    comida REAL NOT NULL,
    ambiente REAL NOT NULL,
    preco_justo REAL NOT NULL,
    comment TEXT,
    created_at TEXT NOT NULL,
    pending_sync INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (tasca_id) REFERENCES tascas(id) ON DELETE CASCADE
  );`,
  `CREATE INDEX IF NOT EXISTS idx_reviews_tasca ON reviews(tasca_id);`
];

const runMigrations = async (db: Database) => {
  for (const query of migrations) {
    await db.execAsync(query);
  }
};

export const getDb = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('tascafinder.db');
    await runMigrations(dbInstance);
    await seedInitialData(dbInstance);
  }
  return dbInstance;
};

export const resetDatabase = async () => {
  if (Platform.OS === 'web') return;
  const db = await getDb();
  await db.execAsync('DELETE FROM reviews;');
  await db.execAsync('DELETE FROM tascas;');
  await seedInitialData(db);
};
