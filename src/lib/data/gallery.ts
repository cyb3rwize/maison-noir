export interface GalleryItem {
  id: string
  title: string
  category: 'food' | 'space' | 'people'
  aspect: 'square' | 'portrait' | 'landscape'
  image: string
}

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'space', label: 'Space' },
  { id: 'people', label: 'People' },
] as const

export const galleryItems: GalleryItem[] = [
  { id: 'f1', title: 'Ember Scallops', category: 'food', aspect: 'portrait', image: '/images/dishes/dish-scallops.jpg' },
  { id: 'f2', title: 'Truffle Risotto', category: 'food', aspect: 'square', image: '/images/dishes/dish-risotto.jpg' },
  { id: 'f3', title: 'A5 Wagyu', category: 'food', aspect: 'landscape', image: '/images/dishes/dish-wagyu.jpg' },
  { id: 'f4', title: 'Oysters', category: 'food', aspect: 'square', image: '/images/dishes/dish-oysters.jpg' },
  { id: 'f5', title: 'Chocolate Souffle', category: 'food', aspect: 'portrait', image: '/images/dishes/dish-souffle.jpg' },
  { id: 's1', title: 'The Dining Room', category: 'space', aspect: 'landscape', image: '/images/gallery/g1.jpg' },
  { id: 's2', title: 'Bar Noir', category: 'space', aspect: 'portrait', image: '/images/gallery/g2.jpg' },
  { id: 's3', title: 'Chefs Counter', category: 'space', aspect: 'square', image: '/images/gallery/g3.jpg' },
  { id: 's4', title: 'The Kitchen', category: 'space', aspect: 'landscape', image: '/images/gallery/g4.jpg' },
  { id: 'p1', title: 'Chef Aurelien', category: 'people', aspect: 'portrait', image: '/images/chef/chef-portrait.jpg' },
  { id: 'p2', title: 'Service Team', category: 'people', aspect: 'square', image: '/images/gallery/g5.jpg' },
  { id: 'p3', title: 'Sommelier', category: 'people', aspect: 'landscape', image: '/images/gallery/g6.jpg' },
]

export function getGradientStyle([c1, c2]: [string, string]): React.CSSProperties {
  return {
    background: 'linear-gradient(135deg, ' + c1 + ' 0%, ' + c2 + ' 100%)',
  }
}
