export interface TimelineEvent {
  year: string
  title: string
  body: string
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2018',
    title: 'A small kitchen in Lyon',
    body: 'Chef Aurelien Dubois begins a two-year apprenticeship under a Michelin-starred chef, learning the grammar of French technique.',
  },
  {
    year: '2020',
    title: 'Kyoto',
    body: 'A year in a kaiseki kitchen reshapes his understanding of seasonality, restraint, and the weight of a single ingredient.',
  },
  {
    year: '2022',
    title: 'New York',
    body: 'Arrives in the city with a notebook, a knife roll, and a plan. Stages at three of the most demanding kitchens in Manhattan.',
  },
  {
    year: '2024',
    title: 'Maison Noir opens',
    body: 'Forty-two seats, one open fire, and a menu that changes with the harvest. The room is designed for stillness.',
  },
  {
    year: '2025',
    title: 'Two Michelin stars',
    body: 'Recognized for singular vision - the youngest restaurant in the city to receive two stars in its first year.',
  },
  {
    year: '2026',
    title: 'Still cooking',
    body: 'The team has grown to twenty-two. The philosophy has not changed: listen to the ingredient, then get out of its way.',
  },
]
