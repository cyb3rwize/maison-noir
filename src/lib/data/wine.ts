export interface Wine {
  id: string
  name: string
  producer: string
  region: string
  vintage: string
  type: 'red' | 'white' | 'sparkling' | 'rose' | 'dessert'
  glass?: number
  bottle: number
  notes: string
  pairing: string
}

export const wines: Wine[] = [
  {
    id: 'w1',
    name: 'Barolo Riserva',
    producer: 'Giacomo Conterno',
    region: 'Piedmont, Italy',
    vintage: '2016',
    type: 'red',
    glass: 32,
    bottle: 185,
    notes: 'Rose petal, tar, dried cherry. Powerful but restrained.',
    pairing: 'Truffle Risotto, A5 Wagyu',
  },
  {
    id: 'w2',
    name: 'Champagne Blanc de Blancs',
    producer: 'Pierre Péters',
    region: 'Côte des Blancs, France',
    vintage: '2019',
    type: 'sparkling',
    glass: 28,
    bottle: 165,
    notes: 'Crisp, mineral, age-worthy. Brioche and citrus peel.',
    pairing: 'Oysters, Ember Scallops',
  },
  {
    id: 'w3',
    name: 'Meursault 1er Cru',
    producer: 'Domaine Roulot',
    region: 'Burgundy, France',
    vintage: '2020',
    type: 'white',
    glass: 38,
    bottle: 240,
    notes: 'Hazelnut, white flowers, wet stone. Taut and precise.',
    pairing: 'Ember Scallops, Lobster',
  },
  {
    id: 'w4',
    name: 'Château Margaux',
    producer: 'Château Margaux',
    region: 'Bordeaux, France',
    vintage: '2015',
    type: 'red',
    bottle: 1250,
    notes: 'Blackcurrant, violet, cedar. A monumental wine.',
    pairing: 'A5 Wagyu',
  },
  {
    id: 'w5',
    name: 'Etna Rosso',
    producer: 'Tenuta delle Terre Nere',
    region: 'Sicily, Italy',
    vintage: '2019',
    type: 'red',
    glass: 22,
    bottle: 98,
    notes: 'Volcanic minerality, red cherry, ash. Elegant.',
    pairing: 'Lobster Fra Diavolo',
  },
  {
    id: 'w6',
    name: 'Tawny Port 20yr',
    producer: 'Taylor Fladgate',
    region: 'Douro, Portugal',
    vintage: 'NV',
    type: 'dessert',
    glass: 24,
    bottle: 140,
    notes: 'Dried fig, toffee, walnut. Long, warm finish.',
    pairing: 'Chocolate Soufflé, Cheese',
  },
]

export const wineTypes = [
  { id: 'all', label: 'All' },
  { id: 'sparkling', label: 'Sparkling' },
  { id: 'white', label: 'White' },
  { id: 'red', label: 'Red' },
  { id: 'dessert', label: 'Dessert' },
] as const
