export interface Dish {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: 'appetizer' | 'main' | 'dessert' | 'wine'
  image: string
  ingredients: string[]
  allergens: string[]
  winePairing?: string
  featured?: boolean
}

export const allDishes: Dish[] = [
  // === APPETIZERS ===
  {
    id: 'a1',
    slug: 'ember-scallops',
    name: 'Ember Scallops',
    description:
      'Hand-dived Hokkaido scallops, charred over binchotan, brown butter, sea herbs, yuzu.',
    price: 54,
    category: 'appetizer',
    image: '/images/dishes/dish-scallops.jpg',
    ingredients: ['Hokkaido scallops', 'Brown butter', 'Sea herbs', 'Yuzu'],
    allergens: ['Shellfish', 'Dairy'],
    winePairing: 'Meursault 1er Cru 2020',
    featured: true,
  },
  {
    id: 'a2',
    slug: 'oysters-three-ways',
    name: 'Oysters, Three Ways',
    description:
      'Kumamoto oysters — raw with mignonette, grilled with miso butter, tempura-fried.',
    price: 42,
    category: 'appetizer',
    image: '/images/dishes/dish-oysters.jpg',
    ingredients: ['Kumamoto oysters', 'Mignonette', 'Miso butter', 'Tempura'],
    allergens: ['Shellfish', 'Gluten'],
    winePairing: 'Chablis Grand Cru 2019',
  },
  {
    id: 'a3',
    slug: 'tartare-noir',
    name: 'Tartare Noir',
    description:
      'Hand-cut prime beef, smoked egg yolk, black garlic, rye crisps.',
    price: 38,
    category: 'appetizer',
    image: '/images/dishes/dish-tartare.jpg',
    ingredients: ['Prime beef', 'Smoked egg yolk', 'Black garlic', 'Rye'],
    allergens: ['Egg', 'Gluten'],
    winePairing: 'Champagne Blanc de Blancs',
  },

  // === MAINS ===
  {
    id: 'm1',
    slug: 'truffle-risotto',
    name: 'Truffle Risotto',
    description:
      'Acquerello rice, aged parmesan, black winter truffle shaved at the table.',
    price: 68,
    category: 'main',
    image: '/images/dishes/dish-risotto.jpg',
    ingredients: ['Acquerello rice', 'Aged parmesan', 'Black truffle', 'Butter', 'Shallot'],
    allergens: ['Dairy'],
    winePairing: 'Barolo Riserva 2016',
    featured: true,
  },
  {
    id: 'm2',
    slug: 'wagyu-tasting',
    name: 'A5 Wagyu Tasting',
    description:
      'Miyazaki A5 wagyu, three preparations, aged soy, fresh wasabi, charred leek.',
    price: 128,
    category: 'main',
    image: '/images/dishes/dish-wagyu.jpg',
    ingredients: ['A5 Wagyu', 'Aged soy', 'Fresh wasabi', 'Charred leek'],
    allergens: ['Soy'],
    winePairing: 'Château Margaux 2015',
    featured: true,
  },
  {
    id: 'm3',
    slug: 'lobster-fra-diavolo',
    name: 'Lobster Fra Diavolo',
    description:
      'Whole Maine lobster, spicy tomato, hand-cut tagliatelle, basil oil.',
    price: 92,
    category: 'main',
    image: '/images/dishes/dish-lobster.jpg',
    ingredients: ['Maine lobster', 'San Marzano tomato', 'Tagliatelle', 'Chili', 'Basil'],
    allergens: ['Shellfish', 'Gluten'],
    winePairing: 'Etna Rosso 2019',
  },
  {
    id: 'm4',
    slug: 'duck-two-ways',
    name: 'Duck, Two Ways',
    description:
      'Dry-aged Hudson Valley duck — seared breast, confit leg, cherry gastrique.',
    price: 76,
    category: 'main',
    image: '/images/dishes/dish-duck.jpg',
    ingredients: ['Hudson Valley duck', 'Cherry', 'Foie gras', 'Bing cherry'],
    allergens: [],
    winePairing: 'Pinot Noir, Burgundy 2018',
  },

  // === DESSERTS ===
  {
    id: 'd1',
    slug: 'chocolate-souffle',
    name: 'Chocolate Soufflé',
    description:
      'Valrhona 70% chocolate soufflé, crème anglaise, gold leaf.',
    price: 28,
    category: 'dessert',
    image: '/images/dishes/dish-souffle.jpg',
    ingredients: ['Valrhona chocolate', 'Eggs', 'Cream', 'Gold leaf'],
    allergens: ['Egg', 'Dairy', 'Gluten'],
    winePairing: 'Tawny Port 20yr',
  },
  {
    id: 'd2',
    slug: 'panna-cotta',
    name: 'Yuzu Panna Cotta',
    description:
      'Silky yuzu panna cotta, compressed strawberry, shiso sorbet.',
    price: 22,
    category: 'dessert',
    image: '/images/dishes/dish-pannacotta.jpg',
    ingredients: ['Yuzu', 'Cream', 'Strawberry', 'Shiso'],
    allergens: ['Dairy'],
    winePairing: 'Moscato d\'Asti',
  },
  {
    id: 'd3',
    slug: 'cheese-cart',
    name: 'The Cheese Cart',
    description:
      'Selection of 12 aged cheeses, honeycomb, marcona almonds, quince paste.',
    price: 34,
    category: 'dessert',
    image: '/images/dishes/dish-cheese.jpg',
    ingredients: ['Assorted cheeses', 'Honeycomb', 'Marcona almonds', 'Quince'],
    allergens: ['Dairy', 'Nuts'],
    winePairing: 'Sauternes 2016',
  },

  // === WINE ===
  {
    id: 'w1',
    slug: 'barolo-riserva',
    name: 'Barolo Riserva 2016',
    description: 'Nebbiolo from Piedmont. Notes of rose, tar, and dried cherry.',
    price: 32,
    category: 'wine',
    image: '/images/dishes/wine-barolo.jpg',
    ingredients: ['Nebbiolo'],
    allergens: ['Sulfites'],
  },
  {
    id: 'w2',
    slug: 'champagne-blanc',
    name: 'Champagne Blanc de Blancs',
    description: 'Grand Cru Côte des Blancs. Crisp, mineral, age-worthy.',
    price: 45,
    category: 'wine',
    image: '/images/dishes/wine-champagne.jpg',
    ingredients: ['Chardonnay'],
    allergens: ['Sulfites'],
  },
]

export const signatureDishes = allDishes.filter((d) => d.featured).slice(0, 3)

export const menuCategories = [
  { id: 'appetizer', label: 'Appetizers' },
  { id: 'main', label: 'Mains' },
  { id: 'dessert', label: 'Desserts' },
  { id: 'wine', label: 'Wine' },
] as const
