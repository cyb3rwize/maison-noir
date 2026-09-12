export interface GalleryItem {
  id: string
  title: string
  category: 'food' | 'space' | 'people'
  aspect: 'square' | 'portrait' | 'landscape'
  gradient: [string, string]
}

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'space', label: 'Space' },
  { id: 'people', label: 'People' },
] as const

export const galleryItems: GalleryItem[] = [
  { id: 'f1', title: 'Ember Scallops', category: 'food', aspect: 'portrait', gradient: ['#1a0f0a', '#e85d2f'] },
  { id: 'f2', title: 'Truffle Risotto', category: 'food', aspect: 'square', gradient: ['#0f0f0f', '#c9a961'] },
  { id: 'f3', title: 'A5 Wagyu', category: 'food', aspect: 'landscape', gradient: ['#1a0a0a', '#8a2a1a'] },
  { id: 'f4', title: 'Oysters', category: 'food', aspect: 'square', gradient: ['#0a1515', '#2a5a5a'] },
  { id: 'f5', title: 'Chocolate Souffle', category: 'food', aspect: 'portrait', gradient: ['#150a0a', '#5a2a1a'] },
  { id: 's1', title: 'The Dining Room', category: 'space', aspect: 'landscape', gradient: ['#0a0a0a', '#2a2a2a'] },
  { id: 's2', title: 'Bar Noir', category: 'space', aspect: 'portrait', gradient: ['#0f0a05', '#4a3a1a'] },
  { id: 's3', title: 'Chefs Counter', category: 'space', aspect: 'square', gradient: ['#0a0a0a', '#3a3a3a'] },
  { id: 's4', title: 'The Terrace', category: 'space', aspect: 'landscape', gradient: ['#0a0f0a', '#2a4a2a'] },
  { id: 'p1', title: 'Chef Aurelien', category: 'people', aspect: 'portrait', gradient: ['#1a1a1a', '#5a5a5a'] },
  { id: 'p2', title: 'Service Team', category: 'people', aspect: 'square', gradient: ['#0f0f0f', '#3a2a2a'] },
  { id: 'p3', title: 'Sommelier', category: 'people', aspect: 'landscape', gradient: ['#0a0510', '#2a1a3a'] },
]

export function getGradientStyle([c1, c2]: [string, string]): React.CSSProperties {
  return {
    background: 'linear-gradient(135deg, ' + c1 + ' 0%, ' + c2 + ' 100%)',
  }
}
