export interface InstagramPost {
  id: string
  caption: string
  likes: number
  gradient: [string, string]
}

export const instagramPosts: InstagramPost[] = [
  { id: 'p1', caption: 'Tonight\'s amuse-bouche', likes: 1247, gradient: ['#1a0f0a', '#e85d2f'] },
  { id: 'p2', caption: 'Fire and patience', likes: 892, gradient: ['#0f0f0f', '#c9a961'] },
  { id: 'p3', caption: 'The last of the season', likes: 1563, gradient: ['#0a1515', '#2a5a5a'] },
  { id: 'p4', caption: 'A quiet moment before service', likes: 741, gradient: ['#150a0a', '#5a2a1a'] },
  { id: 'p5', caption: 'Truffle, shaved at the table', likes: 2104, gradient: ['#0a0a0a', '#3a3a3a'] },
  { id: 'p6', caption: 'Wine from a small producer', likes: 654, gradient: ['#0a0510', '#2a1a3a'] },
]

export const INSTAGRAM_HANDLE = '@maisonnoir'
export const INSTAGRAM_URL = 'https://instagram.com/maisonnoir'
