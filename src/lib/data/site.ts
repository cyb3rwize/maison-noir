export const site = {
  name: 'Maison Noir',
  tagline: 'Modern fine dining, reimagined.',
  description: 'An immersive dining experience in the heart of the city.',
  address: {
    street: '42 Obsidian Lane',
    city: 'New York',
    state: 'NY',
    zip: '10013',
  },
  phone: '+1 (212) 555-0142',
  email: 'hello@maisonnoir.com',
  hours: [
    { day: 'Tue – Thu', time: '5:30 PM – 11:00 PM' },
    { day: 'Fri – Sat', time: '5:00 PM – 12:00 AM' },
    { day: 'Sun', time: '5:00 PM – 10:00 PM' },
    { day: 'Mon', time: 'Closed' },
  ],
  socials: {
    instagram: 'https://instagram.com/maisonnoir',
    facebook: 'https://facebook.com/maisonnoir',
    twitter: 'https://twitter.com/maisonnoir',
  },
} as const
