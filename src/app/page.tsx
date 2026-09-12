import { Hero } from '@/components/sections/Hero'
import { Philosophy } from '@/components/sections/Philosophy'
import { SignatureDishes } from '@/components/sections/SignatureDishes'
import { ChefStory } from '@/components/sections/ChefStory'
import { Reviews } from '@/components/sections/Reviews'
import { Events } from '@/components/sections/Events'
import { Press } from '@/components/sections/Press'
import { InstagramFeed } from '@/components/sections/InstagramFeed'
import { FAQ } from '@/components/sections/FAQ'
import { ReserveCTA } from '@/components/sections/ReserveCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <SignatureDishes />
      <ChefStory />
      <Reviews />
      <Events />
      <Press />
      <InstagramFeed />
      <FAQ />
      <ReserveCTA />
    </>
  )
}
