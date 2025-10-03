import { getDb } from '@/lib/db';

export type Review = {
  id: string;
  tasca_id: string;
  user_nick: string;
  comida: number;
  ambiente: number;
  preco_justo: number;
  comment: string;
  created_at: string;
  pending_sync: number;
};

export const getReviewsByTasca = async (tascaId: string) => {
  const db = await getDb();
  return db.getAllAsync<Review>(
    'SELECT * FROM reviews WHERE tasca_id = ? ORDER BY created_at DESC',
    [tascaId]
  );
};

export const addReview = async (review: Review) => {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO reviews (
      id, tasca_id, user_nick, comida, ambiente, preco_justo, comment, created_at, pending_sync
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      review.id,
      review.tasca_id,
      review.user_nick,
      review.comida,
      review.ambiente,
      review.preco_justo,
      review.comment,
      review.created_at,
      review.pending_sync,
    ]
  );
};

export const getReviewStats = async (tascaId: string) => {
  const db = await getDb();
  return db.getFirstAsync<{
    comida: number;
    ambiente: number;
    preco_justo: number;
    reviews_count: number;
  }>(
    `SELECT
      AVG(comida) as comida,
      AVG(ambiente) as ambiente,
      AVG(preco_justo) as preco_justo,
      COUNT(*) as reviews_count
    FROM reviews
    WHERE tasca_id = ?`,
    [tascaId]
  );
};
