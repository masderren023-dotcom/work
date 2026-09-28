'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  Bell,
  BookOpen,
  ChartNoAxesCombined,
  ChevronDown,
  Grid2X2,
  Layers3,
  LineChart,
  Search,
  Settings,
  Star,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: Grid2X2 },
  { label: 'Trending', href: '/trending', icon: ChartNoAxesCombined },
  { label: 'Hidden Fee Machine', href: '/hidden-fee-machine', icon: Zap },
  { label: 'Analyze Pool', href: '/analyze-pool', icon: LineChart },
  { label: 'Watchlist', href: '/watchlist', icon: Star },
  { label: 'Alerts', href: '/alerts', icon: Bell, badge: '3' },
  { label: 'Wallet Tracker', href: '/wallet-tracker', icon: Wallet },
  { label: 'Token Narrative', href: '/token-narrative', icon: BookOpen },
  { label: 'KOL Tracker', href: '/kol-tracker', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
]

const marketItems = [
  ['SOL', '$238.41', '+3.8%'], ['ETH', '$3,912.07', '+1.1%'], ['BTC', '$101,482.5', '+0.6%'],
  ['JUP', '$0.84', '+4.2%'], ['RAY', '$3.21', '+2.1%'], ['MNDE', '$0.12', '-1.3%'],
  ['POPCAT', '$0.28', '-2.1%'], ['BONK', '$0.000024', '+1.9%'],
]

export default function TerminalPlaceholderPage({ title }: { title: string }) {
  const pathname = usePathname()

  return (
    <div className="trend-shell">
      <aside className="trend-sidebar">
        <div className="trend-brand"><span className="trend-brand-mark">D</span><span><b>Darren Terminal</b><small>v1.0&nbsp; LP Opportunity Finder</small></span></div>
        <p className="trend-nav-label">TERMINAL</p>
        <nav className="trend-nav" aria-label="Terminal navigation">
          {navigation.map(({ label, href, icon: Icon, badge }) => {
            const active = pathname === href || (pathname === '/' && href === '/dashboard')
            return (
              <Link key={label} href={href} className={`trend-nav-link ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
                <Icon size={21} strokeWidth={2} /><span>{label}</span>{badge && <b className="trend-badge">{badge}</b>}
              </Link>
            )
          })}
        </nav>
        <div className="trend-sidebar-health"><div className="trend-online"><i />System Online</div>
          {['RPC|72ms', 'Meteora|68ms', 'GMGN|124ms', 'Jupiter|86ms'].map((entry) => {
            const [name, time] = entry.split('|')
            return <div className="trend-service" key={name}><span><i />{name}</span><b>{time}</b></div>
          })}
        </div>
        <div className="trend-sidebar-footer"><span className="trend-footer-icon"><Users size={18} /></span><span>Darren Terminal v1.0.0<small>Built for LPs on Solana</small></span></div>
      </aside>

      <div className="trend-main">
        <header className="trend-topbar">
          <label className="trend-search"><Search size={16} /><input aria-label="Search token, address, or paste link" placeholder="Search token, address, or paste link..." /></label>
          <div className="trend-tools">
            <div className="trend-time-tabs" aria-label="Market chart interval">{['1m', '5m', '15m', '1h', '4h', '24h'].map((value) => <button key={value} className={value === '1h' ? 'selected' : ''}>{value}</button>)}</div>
            <button className="trend-chain"><Layers3 size={17} /><b>Solana</b><ChevronDown size={13} /></button>
            <button className="trend-icon-button" aria-label="Settings"><Settings size={18} /></button>
            <button className="trend-icon-button" aria-label="Display settings"><Activity size={18} /></button>
            <button className="trend-user" aria-label="User profile">D</button>
          </div>
        </header>
        <div className="trend-ticker" aria-label="Market ticker">
          {marketItems.map(([symbol, price, change]) => <span className="trend-ticker-item" key={symbol}>{symbol} <b>{price}</b> <em className={change.startsWith('-') ? 'negative' : ''}>{change}</em></span>)}
        </div>
        <main className="trend-content">
          <div className="trend-page-heading"><div><h1>{title}</h1></div></div>
          <section className="trend-panel" aria-labelledby="coming-soon-title">
            <div className="trend-panel-title"><h2 id="coming-soon-title">Coming Soon</h2></div>
          </section>
        </main>
      </div>
    </div>
  )
}
