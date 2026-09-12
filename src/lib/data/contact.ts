export const contactInfo = {
  email: 'hello@maisonnoir.com',
  eventsEmail: 'events@maisonnoir.com',
  pressEmail: 'press@maisonnoir.com',
  phone: '+1 (212) 555-0142',
  address: {
    street: '42 Obsidian Lane',
    city: 'New York',
    state: 'NY',
    zip: '10013',
  },
  transit: [
    {
      label: 'Subway',
      detail: 'A/C/E to Canal St · 1 to Franklin St · 2 min walk',
    },
    {
      label: 'Parking',
      detail: 'Valet available Thu–Sat · Garage at 41 Lispenard St',
    },
    {
      label: 'Bike',
      detail: 'Citi Bike station at Broadway & Walker',
    },
  ],
} as const

export const departmentOptions = [
  { id: 'reservations', label: 'Reservations' },
  { id: 'events', label: 'Private Events' },
  { id: 'press', label: 'Press & Media' },
  { id: 'careers', label: 'Careers' },
  { id: 'other', label: 'Something Else' },
] as const
