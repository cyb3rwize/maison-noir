export interface Event {
  id: string
  date: string        // ISO 'YYYY-MM-DD'
  title: string
  time: string
  seats: number
  price: number
  description: string
}

export const events: Event[] = [
  {
    id: 'e1',
    date: '2026-09-24',
    title: 'Truffle Dinner',
    time: '7:00 PM',
    seats: 12,
    price: 285,
    description: 'A five-course celebration of Alba white truffle, shaved tableside.',
  },
  {
    id: 'e2',
    date: '2026-10-03',
    title: 'Wine Pairing Masterclass',
    time: '6:30 PM',
    seats: 8,
    price: 195,
    description: 'An intimate evening with our sommelier, exploring Burgundy.',
  },
  {
    id: 'e3',
    date: '2026-10-17',
    title: 'Chef\'s Table Experience',
    time: '8:00 PM',
    seats: 6,
    price: 425,
    description: 'Six seats at the fire. Fourteen courses. No menu.',
  },
  {
    id: 'e4',
    date: '2026-10-31',
    title: 'All Hallows\' Eve',
    time: '9:00 PM',
    seats: 40,
    price: 165,
    description: 'A single seating. Costumes optional. Caviar mandatory.',
  },
]

export function formatEventDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return dayNames[d.getDay()] + ', ' + monthNames[d.getMonth()] + ' ' + d.getDate()
}
