import { z } from 'zod';

export const tascaSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(5),
  city: z.string().min(2),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  price_level: z.coerce.number().min(1).max(3),
  has_menu_of_day: z.boolean(),
  accepts_cards: z.boolean(),
  veg_options: z.boolean(),
  gluten_free: z.boolean(),
  tags_csv: z.string().optional().default(''),
  phone: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  menu_url: z.string().url().optional().nullable(),
});

export const reviewSchema = z.object({
  tasca_id: z.string().uuid(),
  user_nick: z.string().min(2),
  comida: z.coerce.number().min(0).max(5),
  ambiente: z.coerce.number().min(0).max(5),
  preco_justo: z.coerce.number().min(0).max(5),
  comment: z.string().max(280).optional().default(''),
});
