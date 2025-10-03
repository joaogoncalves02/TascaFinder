import { Review } from './reviewsRepo';

export const computeScore = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return {
      score: 0,
      comida: 0,
      ambiente: 0,
      preco_justo: 0,
      reviews_count: 0,
    };
  }

  const totals = reviews.reduce(
    (acc, review) => {
      acc.comida += review.comida;
      acc.ambiente += review.ambiente;
      acc.preco_justo += review.preco_justo;
      return acc;
    },
    { comida: 0, ambiente: 0, preco_justo: 0 }
  );

  const comida = totals.comida / reviews.length;
  const ambiente = totals.ambiente / reviews.length;
  const preco = totals.preco_justo / reviews.length;
  const weighted = comida * 0.5 + ambiente * 0.3 + preco * 0.2;
  const score = Math.round(weighted * 10) / 10;

  return {
    score,
    comida: Math.round(comida * 10) / 10,
    ambiente: Math.round(ambiente * 10) / 10,
    preco_justo: Math.round(preco * 10) / 10,
    reviews_count: reviews.length,
  };
};
