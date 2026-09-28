import type { Metadata } from 'next'
import Dashboard from '@/components/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard | Darren Terminal',
  description: 'Solana liquidity pool analytics and market opportunities.',
}

export default function DashboardRoute() {
  return <Dashboard />
}
