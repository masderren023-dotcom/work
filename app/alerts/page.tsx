import type { Metadata } from 'next'
import TerminalPlaceholderPage from '@/components/terminal-placeholder-page'

export const metadata: Metadata = { title: 'Alerts | Darren Terminal' }

export default function Page() {
  return <TerminalPlaceholderPage title="Alerts" />
}
