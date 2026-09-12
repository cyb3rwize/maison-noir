export interface InstagramPost {
  id: string
  caption: string
  likes: number
  image: string
}

export const instagramPosts: InstagramPost[] = [
  { id: 'p1', caption: 'Tonights amuse-bouche', likes: 1247, image: '/images/dishes/dish-scallops.jpg' },
  { id: 'p2', caption: 'Fire and patience', likes: 892, image: '/images/gallery/g3.jpg' },
  { id: 'p3', caption: 'The last of the season', likes: 1563, image: '/images/dishes/dish-oysters.jpg' },
  { id: 'p4', caption: 'A quiet moment before service', likes: 741, image: '/images/interior/interior-1.jpg' },
  { id: 'p5', caption: 'Truffle, shaved at the table', likes: 2104, image: '/images/dishes/dish-risotto.jpg' },
  { id: 'p6', caption: 'Wine from a small producer', likes: 654, image: '/images/dishes/wine-barolo.jpg' },
]

export const INSTAGRAM_HANDLE = '@maisonnoir'
export const INSTAGRAM_URL = 'https://instagram.com/maisonnoir'
