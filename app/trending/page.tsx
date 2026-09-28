import type { Metadata } from 'next'
import TrendingPage from '@/components/trending-page'

export const metadata: Metadata = {
  title: 'Trending Opportunities | Darren Terminal',
  description: 'Discover tokens gaining momentum with strong LP activity.',
}

export default function TrendingRoute() {
  return <TrendingPage />
}
