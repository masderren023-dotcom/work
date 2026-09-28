import type { Metadata } from 'next'
import AnalyzePoolPage from '@/components/analyze-pool-page'

export const metadata: Metadata = {
  title: 'Analyze Pool | Darren Terminal',
  description: 'Review fee density, competition, safety, and recommended liquidity ranges for a Solana pool.',
}

export default function AnalyzePoolRoute() {
  return <AnalyzePoolPage />
}
