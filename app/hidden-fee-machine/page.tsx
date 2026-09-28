import type { Metadata } from 'next'
import HiddenFeeMachinePage from '@/components/hidden-fee-machine-page'

export const metadata: Metadata = {
  title: 'Hidden Fee Machine | Darren Terminal',
  description: 'Find overlooked Solana pools with high fee density, low competition, and strong safety metrics.',
}

export default function Page() {
  return <HiddenFeeMachinePage />
}
