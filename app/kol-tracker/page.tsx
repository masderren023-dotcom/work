import type { Metadata } from 'next'
import TerminalPlaceholderPage from '@/components/terminal-placeholder-page'

export const metadata: Metadata = { title: 'KOL Tracker | Darren Terminal' }

export default function Page() {
  return <TerminalPlaceholderPage title="KOL Tracker" />
}
