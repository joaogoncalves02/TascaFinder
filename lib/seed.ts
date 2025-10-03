import { Database } from './db';
import { v4 as uuidv4 } from 'uuid';

const nowIso = () => new Date().toISOString();

type SeedTasca = {
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  price_level: 1 | 2 | 3;
  has_menu_of_day: boolean;
  accepts_cards: boolean;
  veg_options: boolean;
  gluten_free: boolean;
  tags: string[];
  phone?: string;
  website?: string;
  menu_url?: string;
  schedule: Record<string, [string, string][]>;
  reviews: Array<{
    user_nick: string;
    comida: number;
    ambiente: number;
    preco_justo: number;
    comment: string;
  }>;
};

const tascaSeeds: SeedTasca[] = [
  {
    name: 'A Tasquinha do Fado',
    address: 'Rua da Mouraria 15',
    city: 'Lisboa',
    lat: 38.7133,
    lng: -9.1325,
    price_level: 2,
    has_menu_of_day: true,
    accepts_cards: true,
    veg_options: false,
    gluten_free: false,
    tags: ['bacalhau', 'fado', 'caldo verde'],
    phone: '+351210000111',
    website: 'https://atasquinhadofado.pt',
    menu_url: 'https://atasquinhadofado.pt/menu',
    schedule: {
      mon: [
        ['12:00', '15:00'],
        ['19:00', '23:00'],
      ],
      tue: [
        ['12:00', '15:00'],
        ['19:00', '23:00'],
      ],
      wed: [
        ['12:00', '15:00'],
        ['19:00', '23:00'],
      ],
      thu: [
        ['12:00', '15:00'],
        ['19:00', '23:00'],
      ],
      fri: [
        ['12:00', '15:00'],
        ['19:00', '23:30'],
      ],
      sat: [
        ['12:30', '16:00'],
        ['19:00', '23:30'],
      ],
      sun: [
        ['12:30', '16:00'],
      ],
    },
    reviews: [
      {
        user_nick: 'LisboetaAntigo',
        comida: 4.5,
        ambiente: 5,
        preco_justo: 4,
        comment: 'Fado ao vivo e bacalhau à lagareiro impecável.',
      },
      {
        user_nick: 'ViagemComSabores',
        comida: 4,
        ambiente: 4.5,
        preco_justo: 3.5,
        comment: 'Carta tradicional com petiscos ricos, staff acolhedor.',
      },
    ],
  },
  {
    name: 'Casa das Iscas',
    address: 'Rua dos Sapateiros 92',
    city: 'Lisboa',
    lat: 38.7099,
    lng: -9.1361,
    price_level: 1,
    has_menu_of_day: true,
    accepts_cards: false,
    veg_options: false,
    gluten_free: false,
    tags: ['iscas', 'petiscos', 'grelhados'],
    schedule: {
      mon: [
        ['11:30', '15:30'],
      ],
      tue: [
        ['11:30', '15:30'],
      ],
      wed: [
        ['11:30', '15:30'],
      ],
      thu: [
        ['11:30', '15:30'],
      ],
      fri: [
        ['11:30', '15:30'],
      ],
      sat: [
        ['12:00', '16:00'],
      ],
      sun: [],
    },
    reviews: [
      {
        user_nick: 'ComedorDeIscas',
        comida: 4.8,
        ambiente: 3.8,
        preco_justo: 5,
        comment: 'Iscas no ponto e vinho a copo barato, típico.',
      },
      {
        user_nick: 'TascaHunter',
        comida: 4,
        ambiente: 3.5,
        preco_justo: 4.5,
        comment: 'Serviço rápido, menu do dia sempre fresco.',
      },
    ],
  },
  {
    name: 'Adega São Nicolau',
    address: 'Rua de São Nicolau 1',
    city: 'Porto',
    lat: 41.1401,
    lng: -8.6115,
    price_level: 2,
    has_menu_of_day: false,
    accepts_cards: true,
    veg_options: false,
    gluten_free: false,
    tags: ['tripas', 'bacalhau', 'vinho verde'],
    phone: '+351222005522',
    schedule: {
      mon: [
        ['12:00', '15:30'],
        ['19:00', '22:30'],
      ],
      tue: [
        ['12:00', '15:30'],
        ['19:00', '22:30'],
      ],
      wed: [
        ['12:00', '15:30'],
        ['19:00', '22:30'],
      ],
      thu: [
        ['12:00', '15:30'],
        ['19:00', '22:30'],
      ],
      fri: [
        ['12:00', '15:30'],
        ['19:00', '23:00'],
      ],
      sat: [
        ['12:00', '16:00'],
        ['19:00', '23:00'],
      ],
      sun: [],
    },
    reviews: [
      {
        user_nick: 'TripeiroFeliz',
        comida: 4.7,
        ambiente: 4.4,
        preco_justo: 3.8,
        comment: 'Tripas com sabor autêntico, carta de vinhos excelente.',
      },
      {
        user_nick: 'DocesRabelos',
        comida: 4.3,
        ambiente: 4.2,
        preco_justo: 3.5,
        comment: 'Francesinha diferente mas saborosa, atendimento caloroso.',
      },
    ],
  },
  {
    name: 'Taberna Santo António',
    address: 'Rua das Virtudes 32',
    city: 'Porto',
    lat: 41.1448,
    lng: -8.6174,
    price_level: 1,
    has_menu_of_day: true,
    accepts_cards: true,
    veg_options: true,
    gluten_free: false,
    tags: ['rojões', 'pataniscas', 'vinho do porto'],
    schedule: {
      mon: [
        ['12:00', '15:30'],
      ],
      tue: [
        ['12:00', '15:30'],
      ],
      wed: [
        ['12:00', '15:30'],
      ],
      thu: [
        ['12:00', '15:30'],
      ],
      fri: [
        ['12:00', '15:30'],
        ['19:00', '22:00'],
      ],
      sat: [
        ['12:00', '16:00'],
      ],
      sun: [],
    },
    reviews: [
      {
        user_nick: 'BifanaFan',
        comida: 4.2,
        ambiente: 4.6,
        preco_justo: 4.9,
        comment: 'Vista linda para o Douro, prato do dia generoso.',
      },
      {
        user_nick: 'RibeiraWalks',
        comida: 4,
        ambiente: 4.5,
        preco_justo: 4.2,
        comment: 'Petiscos variados, ambiente familiar.',
      },
    ],
  },
  {
    name: 'Cantinho Minhoto',
    address: 'Largo São João do Souto 5',
    city: 'Braga',
    lat: 41.5494,
    lng: -8.4276,
    price_level: 2,
    has_menu_of_day: true,
    accepts_cards: true,
    veg_options: true,
    gluten_free: true,
    tags: ['bacalhau', 'rojões', 'papas de sarrabulho'],
    schedule: {
      mon: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      tue: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      wed: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      thu: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      fri: [
        ['12:00', '15:00'],
        ['19:00', '22:30'],
      ],
      sat: [
        ['12:30', '16:00'],
        ['19:00', '22:30'],
      ],
      sun: [
        ['12:30', '16:00'],
      ],
    },
    reviews: [
      {
        user_nick: 'MinhotoDeRaiz',
        comida: 4.6,
        ambiente: 4.1,
        preco_justo: 4,
        comment: 'Papas de sarrabulho ricas e atendimento muito próximo.',
      },
      {
        user_nick: 'DestinosDoNorte',
        comida: 4.3,
        ambiente: 4.2,
        preco_justo: 4.1,
        comment: 'Carta tradicional com opção vegetariana surpreendente.',
      },
    ],
  },
  {
    name: 'Taberna do Largo',
    address: 'Largo da Sé Velha 8',
    city: 'Coimbra',
    lat: 40.2084,
    lng: -8.4286,
    price_level: 2,
    has_menu_of_day: false,
    accepts_cards: true,
    veg_options: false,
    gluten_free: false,
    tags: ['chanfana', 'queijo da serra', 'caldo verde'],
    schedule: {
      mon: [
        ['12:30', '15:00'],
        ['19:00', '22:30'],
      ],
      tue: [
        ['12:30', '15:00'],
        ['19:00', '22:30'],
      ],
      wed: [
        ['12:30', '15:00'],
        ['19:00', '22:30'],
      ],
      thu: [
        ['12:30', '15:00'],
        ['19:00', '22:30'],
      ],
      fri: [
        ['12:30', '15:00'],
        ['19:00', '23:30'],
      ],
      sat: [
        ['12:30', '16:00'],
        ['19:00', '23:30'],
      ],
      sun: [],
    },
    reviews: [
      {
        user_nick: 'CoimbraSempre',
        comida: 4.5,
        ambiente: 4.2,
        preco_justo: 3.9,
        comment: 'Chanfana incrível, carta de vinhos cuidada.',
      },
      {
        user_nick: 'EstudanteSaudosista',
        comida: 4.1,
        ambiente: 4.3,
        preco_justo: 3.8,
        comment: 'Ambiente histórico, serviço simpático.',
      },
    ],
  },
  {
    name: 'Botequim da Mouraria',
    address: 'Rua Diogo Lopes de Sequeira 2',
    city: 'Évora',
    lat: 38.5717,
    lng: -7.9087,
    price_level: 2,
    has_menu_of_day: true,
    accepts_cards: true,
    veg_options: true,
    gluten_free: false,
    tags: ['açorda', 'ensopado de borrego', 'vinhos alentejanos'],
    schedule: {
      mon: [
        ['12:00', '15:00'],
        ['19:00', '22:30'],
      ],
      tue: [
        ['12:00', '15:00'],
        ['19:00', '22:30'],
      ],
      wed: [
        ['12:00', '15:00'],
        ['19:00', '22:30'],
      ],
      thu: [
        ['12:00', '15:00'],
        ['19:00', '22:30'],
      ],
      fri: [
        ['12:00', '15:00'],
        ['19:00', '23:00'],
      ],
      sat: [
        ['12:30', '16:00'],
        ['19:00', '23:00'],
      ],
      sun: [
        ['12:30', '16:00'],
      ],
    },
    reviews: [
      {
        user_nick: 'AlentejoGourmet',
        comida: 4.8,
        ambiente: 4.4,
        preco_justo: 4,
        comment: 'Ensopado generoso, carta de vinhos alentejanos excelente.',
      },
      {
        user_nick: 'RotaDoVinho',
        comida: 4.2,
        ambiente: 4.1,
        preco_justo: 3.9,
        comment: 'Staff acolhedor, petiscos variados.',
      },
    ],
  },
  {
    name: 'Tasquinha do Rossio',
    address: 'Praça do Rossio 14',
    city: 'Faro',
    lat: 37.0179,
    lng: -7.9351,
    price_level: 1,
    has_menu_of_day: true,
    accepts_cards: false,
    veg_options: true,
    gluten_free: false,
    tags: ['cataplana', 'peixe fresco', 'dieta mediterrânica'],
    schedule: {
      mon: [
        ['12:00', '15:30'],
        ['19:00', '22:00'],
      ],
      tue: [
        ['12:00', '15:30'],
        ['19:00', '22:00'],
      ],
      wed: [
        ['12:00', '15:30'],
        ['19:00', '22:00'],
      ],
      thu: [
        ['12:00', '15:30'],
        ['19:00', '22:00'],
      ],
      fri: [
        ['12:00', '15:30'],
        ['19:00', '22:30'],
      ],
      sat: [
        ['12:00', '16:00'],
        ['19:00', '22:30'],
      ],
      sun: [
        ['12:30', '16:00'],
      ],
    },
    reviews: [
      {
        user_nick: 'MarisqueiroAlgarvio',
        comida: 4.5,
        ambiente: 4.1,
        preco_justo: 4.6,
        comment: 'Cataplana rica e peixe muito fresco.',
      },
      {
        user_nick: 'PraiaPetisqueira',
        comida: 4.1,
        ambiente: 3.9,
        preco_justo: 4.4,
        comment: 'Menu do dia excelente, serviço rápido.',
      },
    ],
  },
  {
    name: 'Adega do Rocha',
    address: 'Rua da Sofia 120',
    city: 'Coimbra',
    lat: 40.2042,
    lng: -8.4303,
    price_level: 1,
    has_menu_of_day: true,
    accepts_cards: true,
    veg_options: false,
    gluten_free: false,
    tags: ['chanfana', 'leitão', 'arroz de lampreia'],
    schedule: {
      mon: [
        ['12:00', '15:00'],
      ],
      tue: [
        ['12:00', '15:00'],
      ],
      wed: [
        ['12:00', '15:00'],
      ],
      thu: [
        ['12:00', '15:00'],
      ],
      fri: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      sat: [
        ['12:00', '16:00'],
      ],
      sun: [],
    },
    reviews: [
      {
        user_nick: 'LampreiaLover',
        comida: 4.4,
        ambiente: 3.9,
        preco_justo: 4.5,
        comment: 'Arroz de lampreia tradicionalíssimo e barato.',
      },
      {
        user_nick: 'SaboresDaBaixa',
        comida: 4.1,
        ambiente: 3.8,
        preco_justo: 4.2,
        comment: 'Menu do dia sempre farto.',
      },
    ],
  },
  {
    name: 'Tasca da Sé',
    address: 'Rua Dom Paio Mendes 58',
    city: 'Braga',
    lat: 41.551,
    lng: -8.4271,
    price_level: 2,
    has_menu_of_day: true,
    accepts_cards: true,
    veg_options: true,
    gluten_free: true,
    tags: ['pataniscas', 'bacalhau', 'arroz de pato'],
    schedule: {
      mon: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      tue: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      wed: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      thu: [
        ['12:00', '15:00'],
        ['19:00', '22:00'],
      ],
      fri: [
        ['12:00', '15:00'],
        ['19:00', '23:00'],
      ],
      sat: [
        ['12:30', '16:00'],
        ['19:00', '23:00'],
      ],
      sun: [],
    },
    reviews: [
      {
        user_nick: 'PataniscasQueen',
        comida: 4.6,
        ambiente: 4.3,
        preco_justo: 4,
        comment: 'Pataniscas crocantes e arroz malandrinho.',
      },
      {
        user_nick: 'TuristaCurioso',
        comida: 4.2,
        ambiente: 4.4,
        preco_justo: 3.9,
        comment: 'Staff super simpático, bom vinho verde.',
      },
    ],
  },
  {
    name: 'Tasquinha do Olival',
    address: 'Rua do Olival 72',
    city: 'Porto',
    lat: 41.1432,
    lng: -8.6215,
    price_level: 2,
    has_menu_of_day: false,
    accepts_cards: true,
    veg_options: true,
    gluten_free: false,
    tags: ['petiscos', 'enchidos', 'vinho do Douro'],
    schedule: {
      mon: [
        ['12:30', '15:00'],
        ['19:00', '23:30'],
      ],
      tue: [
        ['12:30', '15:00'],
        ['19:00', '23:30'],
      ],
      wed: [
        ['12:30', '15:00'],
        ['19:00', '23:30'],
      ],
      thu: [
        ['12:30', '15:00'],
        ['19:00', '23:30'],
      ],
      fri: [
        ['12:30', '15:00'],
        ['19:00', '00:00'],
      ],
      sat: [
        ['12:30', '16:00'],
        ['19:00', '00:00'],
      ],
      sun: [
        ['12:30', '16:00'],
      ],
    },
    reviews: [
      {
        user_nick: 'EnchidosPower',
        comida: 4.5,
        ambiente: 4.7,
        preco_justo: 4,
        comment: 'Tábuas de enchidos fantásticas e grandes vinhos.',
      },
      {
        user_nick: 'NoiteDoPorto',
        comida: 4.1,
        ambiente: 4.6,
        preco_justo: 3.8,
        comment: 'Ótimo para petiscar com amigos, ambiente animado.',
      },
    ],
  },
];

export const seedInitialData = async (db: Database) => {
  const tascasCount = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM tascas'
  );
  if (tascasCount && tascasCount.count > 0) {
    return;
  }

  for (const tasca of tascaSeeds) {
    const tascaId = uuidv4();
    const createdAt = nowIso();
    await db.runAsync(
      `INSERT INTO tascas (
        id, name, address, city, lat, lng, price_level,
        has_menu_of_day, accepts_cards, veg_options, gluten_free,
        tags_csv, phone, website, menu_url, schedule_json, created_at, updated_at, pending_sync
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tascaId,
        tasca.name,
        tasca.address,
        tasca.city,
        tasca.lat,
        tasca.lng,
        tasca.price_level,
        tasca.has_menu_of_day ? 1 : 0,
        tasca.accepts_cards ? 1 : 0,
        tasca.veg_options ? 1 : 0,
        tasca.gluten_free ? 1 : 0,
        tasca.tags.join(', '),
        tasca.phone ?? null,
        tasca.website ?? null,
        tasca.menu_url ?? null,
        JSON.stringify(tasca.schedule),
        createdAt,
        createdAt,
        0,
      ]
    );

    for (const review of tasca.reviews) {
      await db.runAsync(
        `INSERT INTO reviews (
          id, tasca_id, user_nick, comida, ambiente, preco_justo, comment, created_at, pending_sync
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [
          uuidv4(),
          tascaId,
          review.user_nick,
          review.comida,
          review.ambiente,
          review.preco_justo,
          review.comment,
          nowIso(),
        ]
      );
    }
  }
};
