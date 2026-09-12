export interface ReservationFormData {
  // Step 1
  date: string        // ISO date: '2026-09-15'
  time: string        // '19:30'
  partySize: number

  // Step 2
  seating: 'main' | 'terrace' | 'chefs-counter' | 'private'
  firstName: string
  lastName: string
  email: string
  phone: string
  occasion?: string
  notes?: string
}

export interface TimeSlot {
  time: string      // '19:30'
  available: boolean
}

export const seatingOptions = [
  {
    id: 'main',
    label: 'Main Dining Room',
    description: 'Intimate setting, seasonal menu',
  },
  {
    id: 'terrace',
    label: 'Terrace',
    description: 'Open air, weather permitting',
  },
  {
    id: 'chefs-counter',
    label: "Chef's Counter",
    description: 'Front-row seat to the fire',
  },
  {
    id: 'private',
    label: 'Private Room',
    description: 'For parties of 8+',
  },
] as const

export const occasionOptions = [
  'None',
  'Birthday',
  'Anniversary',
  'Date Night',
  'Business Dinner',
  'Celebration',
] as const

/**
 * Mock availability. Real version queries Supabase.
 */
export function getTimeSlots(date: string, partySize: number): TimeSlot[] {
  if (!date) return []
  const base = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
  const seed = date.split('-').join('').split('').reduce((a, b) => a + parseInt(b || '0'), 0)
  return base.map((time, i) => ({
    time,
    available: (seed + i + partySize) % 4 !== 0,
  }))
}

/**
 * Get next 30 days starting today.
 */
export function getUpcomingDates(): { iso: string; day: string; date: number; month: string }[] {
  const out: { iso: string; day: string; date: number; month: string }[] = []
  const today = new Date()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const iso = d.toISOString().split('T')[0]
    out.push({
      iso,
      day: dayNames[d.getDay()],
      date: d.getDate(),
      month: monthNames[d.getMonth()],
    })
  }
  return out
}

/**
 * Format time '19:30' → '7:30 PM'
 */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 || 12
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`
}

/**
 * Format ISO date '2026-09-15' → 'Mon, Sep 15'
 */
export function formatDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`
}
