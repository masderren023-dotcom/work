'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity, ArrowRight, Bell, BookOpen, ChartNoAxesCombined, ChevronDown, CircleHelp,
  Flame, Funnel, Grid2X2, Layers3, LineChart, RotateCw, Search, Settings, ShieldCheck,
  Star, Trophy, Users, Wallet, Zap, Gem, Box, CircleDollarSign,
} from 'lucide-react'

type Pool = {
  rank: number
  token: string
  pair: string
  category: string
  mark: string
  mc: string
  mcValue: number
  age: string
  ageHours: number
  fd1: string
  fd1Value: number
  fd5: string
  fd15: string
  activeTvl: string
  tvlValue: number
  inactiveTvl: string
  lpCount: number
  competition: 'LOW' | 'MED' | 'HIGH'
  hiddenScore: number
  safety: number
  momentum: number
  smartMoney: number
  verified: boolean
  status: 'Early' | 'Growing' | 'Crowding' | 'Saturated'
  tone: string
}

type Column<T> = { key: string; label: string; render: (row: T) => ReactNode; className?: string }

const coinTicker = [
  ['SOL', '$238.41', '+3.8%'], ['ETH', '$3,912.07', '+1.1%'], ['BTC', '$101,482.5', '+0.6%'],
  ['JUP', '$0.84', '+4.2%'], ['RAY', '$3.21', '+2.1%'], ['MNDE', '$0.12', '-1.3%'],
  ['POPCAT', '$0.28', '-2.1%'], ['BONK', '$0.000024', '+1.9%'], ['WIF', '$1.24', '+6.3%'], ['MEW', '$0.0042', '-0.8%'],
]

const categoryOptions = [
  { name: 'Meme', symbol: 'M', tone: 'mint' }, { name: 'AI', symbol: 'A', tone: 'blue' },
  { name: 'DeFi', symbol: 'D', tone: 'violet' }, { name: 'RWA', symbol: 'R', tone: 'cyan' },
  { name: 'GameFi', symbol: 'G', tone: 'green' }, { name: 'DePIN', symbol: 'P', tone: 'orange' },
  { name: 'Others', symbol: 'O', tone: 'gold' },
]

const pools: Pool[] = [
  { rank: 1, token: 'Z500', pair: 'Z500 / SOL', category: 'Meme', mark: 'M', mc: '$1.24M', mcValue: 1.24, age: '8d', ageHours: 192, fd1: '0.0031', fd1Value: .0031, fd5: '0.0028', fd15: '0.0022', activeTvl: '$28.4K', tvlValue: 28.4, inactiveTvl: '$12.1K', lpCount: 86, competition: 'LOW', hiddenScore: 94, safety: 92, momentum: 88, smartMoney: 86, verified: true, status: 'Growing', tone: 'mint' },
  { rank: 2, token: 'BUSHIT', pair: 'BUSHIT / SOL', category: 'Meme', mark: 'M', mc: '$820K', mcValue: .82, age: '2d', ageHours: 48, fd1: '0.0028', fd1Value: .0028, fd5: '0.0022', fd15: '0.0016', activeTvl: '$26.1K', tvlValue: 26.1, inactiveTvl: '$8.4K', lpCount: 64, competition: 'LOW', hiddenScore: 92, safety: 90, momentum: 84, smartMoney: 82, verified: true, status: 'Early', tone: 'gold' },
  { rank: 3, token: 'FROG', pair: 'FROG / SOL', category: 'Meme', mark: 'M', mc: '$2.14M', mcValue: 2.14, age: '12d', ageHours: 288, fd1: '0.0026', fd1Value: .0026, fd5: '0.0021', fd15: '0.0015', activeTvl: '$32.4K', tvlValue: 32.4, inactiveTvl: '$18.2K', lpCount: 72, competition: 'LOW', hiddenScore: 89, safety: 86, momentum: 82, smartMoney: 80, verified: true, status: 'Growing', tone: 'green' },
  { rank: 4, token: 'HEEHAW', pair: 'HEEHAW / SOL', category: 'Meme', mark: 'M', mc: '$1.28M', mcValue: 1.28, age: '3d', ageHours: 72, fd1: '0.0027', fd1Value: .0027, fd5: '0.0020', fd15: '0.0014', activeTvl: '$38.2K', tvlValue: 38.2, inactiveTvl: '$10.4K', lpCount: 68, competition: 'LOW', hiddenScore: 86, safety: 84, momentum: 78, smartMoney: 76, verified: false, status: 'Growing', tone: 'cream' },
  { rank: 5, token: 'A116Z', pair: 'A116Z / SOL', category: 'AI', mark: 'A', mc: '$6.21M', mcValue: 6.21, age: '8d', ageHours: 192, fd1: '0.0024', fd1Value: .0024, fd5: '0.0019', fd15: '0.0012', activeTvl: '$42.1K', tvlValue: 42.1, inactiveTvl: '$28.7K', lpCount: 94, competition: 'LOW', hiddenScore: 82, safety: 80, momentum: 74, smartMoney: 72, verified: true, status: 'Growing', tone: 'cream' },
  { rank: 6, token: 'DREFTY', pair: 'DREFTY / SOL', category: 'Meme', mark: 'M', mc: '$3.21M', mcValue: 3.21, age: '5d', ageHours: 120, fd1: '0.0023', fd1Value: .0023, fd5: '0.0018', fd15: '0.0012', activeTvl: '$52.4K', tvlValue: 52.4, inactiveTvl: '$21.6K', lpCount: 102, competition: 'MED', hiddenScore: 78, safety: 76, momentum: 72, smartMoney: 68, verified: false, status: 'Crowding', tone: 'cream' },
  { rank: 7, token: 'CATG', pair: 'CATG / SOL', category: 'GameFi', mark: 'G', mc: '$880K', mcValue: .88, age: '12d', ageHours: 288, fd1: '0.0015', fd1Value: .0015, fd5: '0.0011', fd15: '0.0008', activeTvl: '$24.1K', tvlValue: 24.1, inactiveTvl: '$12.4K', lpCount: 56, competition: 'LOW', hiddenScore: 76, safety: 74, momentum: 68, smartMoney: 66, verified: true, status: 'Growing', tone: 'cream' },
  { rank: 8, token: 'DGN', pair: 'DGN / SOL', category: 'DePIN', mark: 'P', mc: '$6.23M', mcValue: 6.23, age: '12d', ageHours: 288, fd1: '0.0015', fd1Value: .0015, fd5: '0.0010', fd15: '0.0007', activeTvl: '$62.3K', tvlValue: 62.3, inactiveTvl: '$28.9K', lpCount: 118, competition: 'MED', hiddenScore: 72, safety: 70, momentum: 66, smartMoney: 62, verified: true, status: 'Crowding', tone: 'orange' },
  { rank: 9, token: 'SILY', pair: 'SILY / SOL', category: 'Meme', mark: 'M', mc: '$480K', mcValue: .48, age: '3d', ageHours: 72, fd1: '0.0014', fd1Value: .0014, fd5: '0.0009', fd15: '0.0006', activeTvl: '$48.1K', tvlValue: 48.1, inactiveTvl: '$16.2K', lpCount: 84, competition: 'LOW', hiddenScore: 68, safety: 66, momentum: 62, smartMoney: 58, verified: false, status: 'Growing', tone: 'cream' },
  { rank: 10, token: 'MEOW', pair: 'MEOW / SOL', category: 'Meme', mark: 'M', mc: '$2.87M', mcValue: 2.87, age: '4d', ageHours: 96, fd1: '0.0014', fd1Value: .0014, fd5: '0.0009', fd15: '0.0006', activeTvl: '$38.4K', tvlValue: 38.4, inactiveTvl: '$14.8K', lpCount: 76, competition: 'LOW', hiddenScore: 64, safety: 62, momentum: 58, smartMoney: 56, verified: true, status: 'Early', tone: 'cream' },
]

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Grid2X2 }, { label: 'Trending', href: '/trending', icon: ChartNoAxesCombined },
  { label: 'Hidden Fee Machine', href: '/hidden-fee-machine', icon: Zap }, { label: 'Analyze Pool', href: '/analyze-pool', icon: LineChart },
  { label: 'Watchlist', href: '/watchlist', icon: Star }, { label: 'Alerts', href: '/alerts', icon: Bell, badge: '3' },
  { label: 'Wallet Tracker', href: '/wallet-tracker', icon: Wallet }, { label: 'Token Narrative', href: '/token-narrative', icon: BookOpen },
  { label: 'KOL Tracker', href: '/kol-tracker', icon: Users }, { label: 'Settings', href: '/settings', icon: Settings },
]

function Sidebar() {
  const pathname = usePathname()
  return <aside className="trend-sidebar">
    <div className="trend-brand"><span className="trend-brand-mark">D</span><span><b>Darren Terminal</b><small>v1.0&nbsp; LP Opportunity Finder</small></span></div>
    <p className="trend-nav-label">TERMINAL</p>
    <nav className="trend-nav" aria-label="Terminal navigation">
      {navItems.map(({ label, href, icon: Icon, badge }) => {
        const active = pathname === href || (pathname === '/' && href === '/dashboard')
        return <Link key={label} href={href} className={`trend-nav-link ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
          <Icon size={21} strokeWidth={2} /><span>{label}</span>{badge && <b className="trend-badge">{badge}</b>}
        </Link>
      })}
    </nav>
    <div className="trend-sidebar-health"><div className="trend-online"><i />System Online</div>
      {['RPC|72ms', 'Meteora|68ms', 'GMGN|124ms', 'Jupiter|86ms'].map((entry) => { const [name, time] = entry.split('|'); return <div className="trend-service" key={name}><span><i />{name}</span><b>{time}</b></div> })}
    </div>
    <div className="trend-sidebar-footer"><span className="trend-footer-icon"><Users size={18} /></span><span>Darren Terminal v1.0.0<small>Built for LPs on Solana</small></span></div>
  </aside>
}

function Header() {
  const [interval, setInterval] = useState('1h')
  return <>
    <header className="trend-topbar">
      <label className="trend-search"><Search size={16} /><input aria-label="Search token, address, or paste link" placeholder="Search token, address, or paste link..." /></label>
      <div className="trend-tools"><div className="trend-time-tabs" aria-label="Market chart interval">{['1m', '5m', '15m', '1h', '4h', '24h'].map((value) => <button key={value} onClick={() => setInterval(value)} className={interval === value ? 'selected' : ''}>{value}</button>)}</div>
        <button className="trend-chain"><Layers3 size={17} /><b>Solana</b><ChevronDown size={13} /></button><button className="trend-icon-button" aria-label="Settings"><Settings size={18} /></button><button className="trend-icon-button" aria-label="Display settings"><Activity size={18} /></button><button className="trend-user" aria-label="User profile">D</button>
      </div>
    </header>
    <div className="trend-ticker" aria-label="Market prices">{coinTicker.map(([name, price, change]) => <div className="trend-ticker-item" key={name}><span>{name}</span><b>{price}</b><em className={change.startsWith('-') ? 'negative' : ''}>{change}</em></div>)}</div>
  </>
}

function TokenMark({ pool, small = false }: { pool: Pick<Pool, 'token' | 'tone'>; small?: boolean }) {
  return <span className={`trend-token trend-token-${pool.tone} ${small ? 'small' : ''}`} aria-hidden="true">{pool.token.slice(0, 1)}</span>
}

function MiniLine({ tone = 'green' }: { tone?: 'green' | 'red' }) {
  return <svg className="hidden-spark" viewBox="0 0 62 25" aria-hidden="true"><path d="M1 21 8 18 13 19 19 12 25 16 31 11 37 15 43 7 49 10 55 4 61 2" fill="none" stroke={tone === 'red' ? '#ff3f4f' : '#00e889'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Metrics() {
  const metricCards = [
    { label: 'Avg FD 1m', value: '0.0031', change: '+24%', Icon: Flame, color: 'green' },
    { label: 'Avg FD 5m', value: '0.0028', change: '+18%', Icon: ChartNoAxesCombined, color: 'green' },
    { label: 'Avg FD 15m', value: '0.0022', change: '+12%', Icon: CircleDollarSign, color: 'green' },
    { label: 'Hidden Candidates', value: '247', change: '+30%', Icon: Gem, color: 'red' },
    { label: 'S Tier', value: '18', change: '+5', Icon: Trophy, color: 'gold' },
    { label: 'A Tier', value: '63', change: '+11', Icon: Star, color: 'blue' },
    { label: 'B Tier', value: '166', change: '+22', Icon: Box, color: 'green' },
  ]
  return <section className="hidden-metrics" aria-label="Hidden fee machine metrics">{metricCards.map(({ label, value, change, Icon, color }) => <article className="hidden-metric" key={label}><span className={`hidden-metric-icon ${color}`}><Icon size={27} fill={label === 'Avg FD 1m' ? 'currentColor' : 'none'} /></span><div className="hidden-metric-copy"><span>{label}</span><b>{value}</b><small>{change}</small></div><MiniLine tone={color === 'red' ? 'red' : 'green'} /></article>)}</section>
}

function TierFilters({ tier, setTier, category, setCategory, sortBy, setSortBy, onToggleFilters, onReset, filterOpen }: {
  tier: string; setTier: (value: string) => void; category: string; setCategory: (value: string) => void
  sortBy: string; setSortBy: (value: string) => void; onToggleFilters: () => void; onReset: () => void; filterOpen: boolean
}) {
  return <div className="hidden-tier-row">
    <div className="hidden-button-group" role="group" aria-label="Filter by hidden score tier">{['All', 'S Tier', 'A Tier', 'B Tier'].map((value) => <button key={value} className={tier === value ? 'selected' : ''} onClick={() => setTier(value)}>{value}</button>)}</div>
    <span className="hidden-filter-divider" />
    <div className="hidden-button-group hidden-category-group" role="group" aria-label="Filter by category">{categoryOptions.map(({ name, symbol, tone }) => <button key={name} className={category === name ? 'selected' : ''} onClick={() => setCategory(category === name ? 'All' : name)}><i className={`category-chip-icon ${tone}`}>{symbol}</i>{name}</button>)}</div>
    <div className="hidden-toolbar-actions"><label className="hidden-sort"><span>Sort by</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort pools"><option value="score">Hidden Score</option><option value="fd1">FD 1m</option><option value="fd5">FD 5m</option><option value="tvl">Active TVL</option></select><ChevronDown size={13} /></label>
      <button className={`hidden-outline-button ${filterOpen ? 'active' : ''}`} onClick={onToggleFilters}><Funnel size={15} />Filters</button><button className="hidden-outline-button" onClick={onReset}><RotateCw size={15} />Reset</button>
    </div>
  </div>
}

function Switch({ checked, label, onChange }: { checked: boolean; label: string; onChange: (value: boolean) => void }) {
  return <label className="hidden-switch-label"><span>{label}</span><button type="button" role="switch" aria-checked={checked} aria-label={label} className={`hidden-switch ${checked ? 'on' : ''}`} onClick={() => onChange(!checked)}><i /></button></label>
}

type FilterRowValues = { minFd: string; minScore: string; minTvl: string; maxCompetition: string }

function FilterRow({ age, setAge, filters, setFilter, verifiedOnly, setVerifiedOnly, hideCrowded, setHideCrowded, open, onClose }: {
  age: string; setAge: (value: string) => void; filters: FilterRowValues
  setFilter: (key: keyof FilterRowValues, value: string) => void; verifiedOnly: boolean; setVerifiedOnly: (value: boolean) => void
  hideCrowded: boolean; setHideCrowded: (value: boolean) => void; open: boolean; onClose: () => void
}) {
  const ages = ['12h+', '24h+', '48h+', '7d+']
  return <div className="hidden-filter-area">
    <div className="hidden-advanced-row">
      <div className="hidden-compact-select age-filter" role="group" aria-label="Minimum pool age">{ages.map((value) => <button key={value} onClick={() => setAge(value)} className={age === value ? 'selected' : ''}>{value}</button>)}</div>
      <label className="hidden-compact-select hidden-select"><span>Min FD 1m</span><select value={filters.minFd} onChange={(event) => setFilter('minFd', event.target.value)} aria-label="Minimum fee density one minute"><option value="0">All</option><option value="0.001">0.001+</option><option value="0.002">0.002+</option><option value="0.0025">0.0025+</option><option value="0.003">0.003+</option></select><ChevronDown size={13} /></label>
      <label className="hidden-compact-select hidden-select"><span>Min Active TVL</span><select value={filters.minTvl} onChange={(event) => setFilter('minTvl', event.target.value)} aria-label="Minimum active TVL"><option value="0">All</option><option value="20">$20K+</option><option value="30">$30K+</option><option value="40">$40K+</option></select><ChevronDown size={13} /></label>
      <label className="hidden-compact-select hidden-select"><span>Max Competition</span><select value={filters.maxCompetition} onChange={(event) => setFilter('maxCompetition', event.target.value)} aria-label="Maximum competition"><option value="HIGH">All</option><option value="MED">Medium</option><option value="LOW">Low only</option></select><ChevronDown size={13} /></label>
      <div className="hidden-switches"><Switch label="Verified Only" checked={verifiedOnly} onChange={setVerifiedOnly} /><Switch label="Hide Crowded" checked={hideCrowded} onChange={setHideCrowded} /></div>
    </div>
    {open && <div className="hidden-filter-popover"><div><span>Minimum Hidden Score</span><label className="hidden-popover-select"><select value={filters.minScore} onChange={(event) => setFilter('minScore', event.target.value)} aria-label="Minimum hidden score"><option value="0">Any score</option><option value="60">60+</option><option value="70">70+</option><option value="80">80+</option><option value="90">90+</option></select><ChevronDown size={13} /></label></div><button onClick={onClose} className="hidden-popover-done">Done <ArrowRight size={14} /></button></div>}
  </div>
}

function GenericTable<T extends { rank: number }>({ columns, rows, label, className = '' }: { columns: Column<T>[]; rows: T[]; label: string; className?: string }) {
  return <div className={`hidden-table-scroll ${className}`}><table className="hidden-data-table"><caption className="sr-only">{label}</caption><thead><tr>{columns.map((column) => <th className={column.className} key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.rank}>{columns.map((column) => <td className={column.className} key={column.key}>{column.render(row)}</td>)}</tr>)}</tbody></table></div>
}

function PoolToken({ pool }: { pool: Pool }) { return <span className="hidden-pool-name"><TokenMark pool={pool} /><span>{pool.pair}</span></span> }
function ScorePill({ value, strong = false }: { value: number; strong?: boolean }) { return <span className={`hidden-score-pill ${strong ? 'strong' : ''} ${value < 75 ? 'mid' : ''}`}>{value}</span> }

function RankingTable({ rows, onAnalyze }: { rows: Pool[]; onAnalyze: (pool: Pool) => void }) {
  const columns: Column<Pool>[] = [
    { key: 'rank', label: '#', render: (pool) => pool.rank },
    { key: 'pair', label: '◉　Token / Pair', render: (pool) => <PoolToken pool={pool} /> },
    { key: 'mc', label: 'MC', className: 'right', render: (pool) => pool.mc },
    { key: 'age', label: 'Age', className: 'right', render: (pool) => pool.age },
    { key: 'fd1', label: 'FD 1m', className: 'center', render: (pool) => <span className="fd-value">{pool.fd1}<small>{pool.rank === 1 ? '+18%' : pool.rank === 2 ? '+16%' : pool.rank === 3 ? '+14%' : pool.rank === 4 ? '+15%' : `+${Math.max(3, 14 - pool.rank)}%`}</small></span> },
    { key: 'fd5', label: 'FD 5m', className: 'center', render: (pool) => <span className="fd-value">{pool.fd5}<small>{pool.rank < 3 ? '+12%' : '+6%'}</small></span> },
    { key: 'fd15', label: 'FD 15m', className: 'center', render: (pool) => <span className="fd-value">{pool.fd15}<small>{pool.rank < 3 ? '+6%' : '+3%'}</small></span> },
    { key: 'active', label: 'Active TVL', className: 'right', render: (pool) => pool.activeTvl },
    { key: 'inactive', label: 'Inactive TVL', className: 'right', render: (pool) => pool.inactiveTvl },
    { key: 'lp', label: 'LP Count', className: 'right', render: (pool) => pool.lpCount },
    { key: 'competition', label: 'Competition', className: 'center', render: (pool) => <span className={`hidden-competition ${pool.competition.toLowerCase()}`}>{pool.competition}</span> },
    { key: 'score', label: 'Hidden Score', className: 'center highlighted-heading', render: (pool) => <ScorePill value={pool.hiddenScore} strong /> },
    { key: 'safety', label: 'Safety', className: 'center', render: (pool) => <ScorePill value={pool.safety} /> },
    { key: 'momentum', label: 'Momentum', className: 'center', render: (pool) => <ScorePill value={pool.momentum} /> },
    { key: 'smart', label: 'Smart Money', className: 'center', render: (pool) => <ScorePill value={pool.smartMoney} /> },
    { key: 'action', label: 'Action', className: 'center', render: (pool) => <button className="hidden-analyze" onClick={() => onAnalyze(pool)}>Analyze</button> },
  ]
  return <GenericTable columns={columns} rows={rows} label="Hidden fee machine pool rankings" className="hidden-ranking-table" />
}

function WeightedBar({ label, value, weight, color }: { label: string; value: number; weight: string; color: string }) {
  const contribution = Math.round(value * Number.parseInt(weight, 10) / 100)
  return <div className="weighted-row"><div className="weighted-label"><span><i style={{ background: color }} />{label}</span><b>{weight}</b></div><div className="weighted-track"><i style={{ width: `${value}%`, background: color }} /><span>{contribution}</span></div></div>
}

function ScoreBreakdown({ pool }: { pool: Pool }) {
  const portions = [
    { label: 'Fee Density', value: 95, weight: '35%', color: '#12d9a5' },
    { label: 'Low Competition', value: 82, weight: '25%', color: '#68d4bf' },
    { label: 'Safety', value: pool.safety, weight: '15%', color: '#a1d7c6' },
    { label: 'Momentum', value: pool.momentum, weight: '15%', color: '#ed9cb1' },
    { label: 'Smart Money', value: pool.smartMoney, weight: '10%', color: '#bf72e4' },
  ]
  return <section className="hidden-panel breakdown-panel"><h2>Hidden Score Breakdown</h2><div className="breakdown-content"><div className="hidden-score-donut"><div><b>{pool.hiddenScore}</b><span>Hidden Score</span></div></div><div className="weighted-list">{portions.map((portion) => <WeightedBar key={portion.label} {...portion} />)}</div></div></section>
}

function ComparisonPanel() {
  const compare = [{ label: 'FD 1m', hidden: .0031, popular: .0012, displayHidden: '0.0031', displayPopular: '0.0012' }, { label: 'Active TVL', hidden: 28, popular: 240, displayHidden: '$28K', displayPopular: '$240K' }, { label: 'Competition', hidden: 1.2, popular: 5.8, displayHidden: '1.2', displayPopular: '5.8' }]
  return <section className="hidden-panel comparison-panel"><h2>Hidden vs Popular Comparison</h2><div className="comparison-legend"><span><i className="legend-hidden" />Hidden Pools</span><span><i className="legend-popular" />Popular Pools</span></div><div className="comparison-bars">{compare.map((item) => { const max = Math.max(item.hidden, item.popular); return <div className="comparison-group" key={item.label}><div className="comparison-values"><div><b>{item.displayHidden}</b><i style={{ height: `${Math.max(18, item.hidden / max * 65)}px` }} /></div><div><b>{item.displayPopular}</b><i style={{ height: `${Math.max(18, item.popular / max * 65)}px` }} /></div></div><span>{item.label}</span></div> })}</div></section>
}

function CategoryScores() {
  const values = [['Meme', 42, 'mint'], ['AI', 18, 'blue'], ['DeFi', 15, 'violet'], ['RWA', 10, 'cyan'], ['GameFi', 8, 'green'], ['DePIN', 5, 'orange'], ['Others', 2, 'gold']] as const
  return <section className="hidden-panel categories-panel"><h2>Top Categories (Hidden Score)</h2><div className="hidden-category-list">{values.map(([label, value, tone]) => <div className="hidden-category-row" key={label}><span className={`category-chip-icon ${tone}`}>{label.slice(0, 1)}</span><span>{label}</span><i><b style={{ width: `${value * 2}%` }} /></i><strong>{value}%</strong></div>)}</div></section>
}

function OpportunityPanel({ pool }: { pool: Pool }) {
  const reasons = ['Low active TVL but high fees', 'Early stage opportunity', 'Low competition', 'Growing smart money activity', 'Strong fee density trend']
  return <section className="hidden-panel why-panel"><h2>Why It's Hidden?</h2><div className="hidden-reasons">{reasons.map((reason, index) => <div key={reason}><i className={`reason-icon reason-${index}`}><Flame size={14} fill="currentColor" /></i><span>{reason}</span></div>)}</div><div className="entry-strip"><div className="entry-strip-head"><span>Recommended Entry</span><span className={`opportunity-status status-${pool.status.toLowerCase()}`}><i />{pool.status}</span></div><div className="entry-values"><span>LP Range <b>±8%</b></span><span>Safety Buffer <b>12%</b></span><span>Score <b>{pool.hiddenScore}</b></span></div></div></section>
}

function DetailsDialog({ pool, onClose }: { pool: Pool; onClose: () => void }) {
  return <div className="hidden-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="hidden-dialog" role="dialog" aria-modal="true" aria-labelledby="hidden-dialog-title"><button className="hidden-dialog-close" onClick={onClose} aria-label="Close">×</button><span className="hidden-dialog-eyebrow">POOL ANALYSIS</span><h2 id="hidden-dialog-title"><TokenMark pool={pool} />{pool.pair}</h2><p>High fee density with {pool.competition.toLowerCase()} competition.</p><div className="dialog-score-grid"><div><span>Hidden Score</span><b>{pool.hiddenScore}</b></div><div><span>FD 1m</span><b>{pool.fd1}</b></div><div><span>Active TVL</span><b>{pool.activeTvl}</b></div><div><span>Opportunity</span><b className={`opportunity-status status-${pool.status.toLowerCase()}`}><i />{pool.status}</b></div></div><div className="dialog-entry"><b>Recommended Entry</b><span>Suggested LP Range <strong>±8%</strong></span><span>Safety Buffer <strong>12%</strong></span></div><button className="hidden-dialog-done" onClick={onClose}>Close analysis</button></section></div>
}

export default function HiddenFeeMachinePage({ initialAnalysis = false }: { initialAnalysis?: boolean }) {
  const [tier, setTier] = useState('All')
  const [category, setCategory] = useState('All')
  const [age, setAge] = useState('24h+')
  const [sortBy, setSortBy] = useState('score')
  const [filterOpen, setFilterOpen] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [hideCrowded, setHideCrowded] = useState(true)
  const [filters, setFilters] = useState({ minFd: '0', minScore: '0', minTvl: '0', maxCompetition: 'HIGH' })
  const [selectedPool, setSelectedPool] = useState<Pool | null>(initialAnalysis ? pools[0] : null)
  const ageThreshold: Record<string, number> = { '12h+': 12, '24h+': 24, '48h+': 48, '7d+': 168 }
  const visiblePools = useMemo(() => {
    const tierRange: Record<string, (score: number) => boolean> = {
      All: () => true, 'S Tier': (score) => score >= 90, 'A Tier': (score) => score >= 80 && score < 90, 'B Tier': (score) => score >= 60 && score < 80,
    }
    const competitionRank = { LOW: 1, MED: 2, HIGH: 3 }
    return pools.filter((pool) => (category === 'All' || pool.category === category)
      && pool.ageHours >= ageThreshold[age]
      && tierRange[tier](pool.hiddenScore)
      && pool.fd1Value >= Number(filters.minFd)
      && pool.hiddenScore >= Number(filters.minScore)
      && pool.tvlValue >= Number(filters.minTvl)
      && competitionRank[pool.competition] <= competitionRank[filters.maxCompetition as Pool['competition']]
      && (!verifiedOnly || pool.verified)
      && (!hideCrowded || pool.status !== 'Crowding' && pool.status !== 'Saturated'))
      .sort((a, b) => sortBy === 'fd1' ? b.fd1Value - a.fd1Value : sortBy === 'fd5' ? Number(b.fd5) - Number(a.fd5) : sortBy === 'tvl' ? b.tvlValue - a.tvlValue : b.hiddenScore - a.hiddenScore)
      .map((pool, index) => ({ ...pool, rank: index + 1 }))
  }, [age, ageThreshold, category, filters, hideCrowded, sortBy, tier, verifiedOnly])
  const setFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }))
  const reset = () => { setTier('All'); setCategory('All'); setAge('24h+'); setSortBy('score'); setVerifiedOnly(false); setHideCrowded(true); setFilters({ minFd: '0', minScore: '0', minTvl: '0', maxCompetition: 'HIGH' }); setFilterOpen(false) }
  const featuredPool = visiblePools[0] ?? pools[0]

  return <div className="trend-shell hidden-machine-shell"><Sidebar /><main className="trend-main"><Header /><div className="hidden-machine-content">
    <section className="hidden-heading-row"><div><h1>Hidden Fee Machine</h1><p>Find overlooked pools with high fee density and low competition</p></div><aside className="hidden-intro-card"><div><b>What is Hidden Fee Machine?</b><span>Find pools with high fee density (fees generated/active TVL),<br /> low competition, and strong safety metrics before they get crowded.</span></div><button onClick={() => setSelectedPool(featuredPool)}>Learn More <ArrowRight size={14} /></button></aside></section>
    <Metrics />
    <TierFilters tier={tier} setTier={setTier} category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} onToggleFilters={() => setFilterOpen((value) => !value)} onReset={reset} filterOpen={filterOpen} />
    <FilterRow age={age} setAge={setAge} filters={filters} setFilter={setFilter} verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} hideCrowded={hideCrowded} setHideCrowded={setHideCrowded} open={filterOpen} onClose={() => setFilterOpen(false)} />
    <section className="hidden-panel ranking-panel"><div className="hidden-table-toolbar"><h2>Hidden Fee Opportunities <span>(Real-time)</span></h2><span>{visiblePools.length} pools found</span></div><RankingTable rows={visiblePools} onAnalyze={setSelectedPool} /></section>
    <div className="hidden-analysis-grid"><ScoreBreakdown pool={featuredPool} /><ComparisonPanel /><CategoryScores /><OpportunityPanel pool={featuredPool} /></div>
  </div></main>{selectedPool && <DetailsDialog pool={selectedPool} onClose={() => setSelectedPool(null)} />}</div>
}
