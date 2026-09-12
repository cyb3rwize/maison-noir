export interface Review {
  id: string
  author: string
  source: string
  rating: number
  date: string
  body: string
}

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Marianne L.',
    source: 'Michelin Guide',
    rating: 5,
    date: 'October 2025',
    body: 'A restaurant that understands restraint. Every plate arrives as if it has always existed. The Ember Scallops alone justify the trip.',
  },
  {
    id: 'r2',
    author: 'David Chen',
    source: 'The New York Times',
    rating: 5,
    date: 'September 2025',
    body: 'Aurelien Dubois is quietly building one of the most interesting kitchens in the city. The truffle risotto is a masterclass in humility.',
  },
  {
    id: 'r3',
    author: 'Priya R.',
    source: 'Resy',
    rating: 5,
    date: 'August 2025',
    body: 'We came for an anniversary. The staff remembered our names, our wine, and my wifes allergy without being asked twice. Extraordinary.',
  },
  {
    id: 'r4',
    author: 'James O.',
    source: 'Eater',
    rating: 5,
    date: 'July 2025',
    body: 'The dining room is so quiet you can hear the fire. This is what fine dining should feel like - unhurried, precise, warm.',
  },
]
