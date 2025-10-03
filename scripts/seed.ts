import { getDb, resetDatabase } from '@/lib/db';

(async () => {
  await resetDatabase();
  console.log('Database reseeded with demo data.');
  const db = await getDb();
  const count = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM tascas');
  console.log(`Tascas disponíveis: ${count?.count ?? 0}`);
})();
