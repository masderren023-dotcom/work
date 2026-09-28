'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity, ArrowUpRight, Bell, BookOpen, ChartNoAxesCombined, ChevronDown, CircleDollarSign,
  Clock3, Flame, Funnel, Grid2X2, Layers3, LineChart, Search, Settings, ShieldCheck, Star,
  Users, Wallet, Zap,
} from 'lucide-react'

type TokenRow = {
  rank: number
  token: string
  category: string
  mc: string
  mcValue: number
  price: string
  change: string
  volume: string
  volumeValue: number
  fd1: string
  fd5: string
  fd15: string
  age: string
  ageHours: number
  smartMoney: string
  score: number
  tone: string
}

type Column<T> = {
  key: string
  label: string
  render: (row: T) => ReactNode
  className?: string
}

const coins = [
  ['SOL', '$238.41', '+3.8%'], ['ETH', '$3,912.07', '+1.1%'], ['BTC', '$101,482.5', '+0.6%'],
  ['JUP', '$0.84', '+4.2%'], ['RAY', '$3.21', '+2.1%'], ['MNDE', '$0.12', '-1.3%'],
  ['POPCAT', '$0.28', '-2.1%'], ['BONK', '$0.000024', '+1.9%'],
]

const categories = [
  { name: 'Meme', mark: 'M', tone: 'mint' }, { name: 'AI', mark: 'A', tone: 'blue' },
  { name: 'DeFi', mark: 'D', tone: 'violet' }, { name: 'RWA', mark: 'R', tone: 'cyan' },
  { name: 'GameFi', mark: 'G', tone: 'green' }, { name: 'DePIN', mark: 'P', tone: 'orange' },
  { name: 'Others', mark: 'O', tone: 'gold' },
]

const tokens: TokenRow[] = [
  { rank: 1, token: 'Z500', category: 'Meme', mc: '$1.24M', mcValue: 1.24, price: '$0.00124', change: '+124%', volume: '$2.8M', volumeValue: 2.8, fd1: '0.0031', fd5: '0.0028', fd15: '0.0022', age: '8d', ageHours: 192, smartMoney: '+$240K', score: 94, tone: 'mint' },
  { rank: 2, token: 'BUSHIT', category: 'Meme', mc: '$820K', mcValue: .82, price: '$0.00082', change: '+87%', volume: '$1.6M', volumeValue: 1.6, fd1: '0.0028', fd5: '0.0022', fd15: '0.0016', age: '2d', ageHours: 48, smartMoney: '+$182K', score: 92, tone: 'gold' },
  { rank: 3, token: 'FROG', category: 'Meme', mc: '$2.14M', mcValue: 2.14, price: '$0.00214', change: '+62%', volume: '$4.2M', volumeValue: 4.2, fd1: '0.0026', fd5: '0.0021', fd15: '0.0015', age: '12d', ageHours: 288, smartMoney: '+$96K', score: 89, tone: 'green' },
  { rank: 4, token: 'HEEHAW', category: 'Meme', mc: '$1.28M', mcValue: 1.28, price: '$0.00128', change: '+48%', volume: '$880K', volumeValue: .88, fd1: '0.0027', fd5: '0.0020', fd15: '0.0014', age: '3d', ageHours: 72, smartMoney: '-$42K', score: 86, tone: 'cream' },
  { rank: 5, token: 'A116Z', category: 'AI', mc: '$6.21M', mcValue: 6.21, price: '$0.00621', change: '+36%', volume: '$3.1M', volumeValue: 3.1, fd1: '0.0024', fd5: '0.0019', fd15: '0.0012', age: '8d', ageHours: 192, smartMoney: '+$120K', score: 82, tone: 'cream' },
  { rank: 6, token: 'DREFTY', category: 'DeFi', mc: '$3.21M', mcValue: 3.21, price: '$0.00321', change: '+32%', volume: '$1.9M', volumeValue: 1.9, fd1: '0.0023', fd5: '0.0018', fd15: '0.0012', age: '5d', ageHours: 120, smartMoney: '-$58K', score: 78, tone: 'cream' },
  { rank: 7, token: 'CATG', category: 'RWA', mc: '$880K', mcValue: .88, price: '$0.00088', change: '+28%', volume: '$2.6M', volumeValue: 2.6, fd1: '0.0015', fd5: '0.0011', fd15: '0.0008', age: '12d', ageHours: 288, smartMoney: '+$74K', score: 76, tone: 'cream' },
  { rank: 8, token: 'DGN', category: 'GameFi', mc: '$6.23M', mcValue: 6.23, price: '$0.00623', change: '+24%', volume: '$2.8M', volumeValue: 2.8, fd1: '0.0015', fd5: '0.0010', fd15: '0.0007', age: '12d', ageHours: 288, smartMoney: '+$61K', score: 74, tone: 'orange' },
  { rank: 9, token: 'SILY', category: 'DePIN', mc: '$480K', mcValue: .48, price: '$0.00048', change: '+22%', volume: '$410K', volumeValue: .41, fd1: '0.0014', fd5: '0.0009', fd15: '0.0006', age: '3d', ageHours: 72, smartMoney: '-$21K', score: 72, tone: 'cream' },
  { rank: 10, token: 'MEOW', category: 'Others', mc: '$2.87M', mcValue: 2.87, price: '$0.00287', change: '+18%', volume: '$1.2M', volumeValue: 1.2, fd1: '0.0024', fd5: '0.0015', fd15: '0.0009', age: '4d', ageHours: 96, smartMoney: '+$38K', score: 70, tone: 'cream' },
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

function Header({ windowValue, onWindowChange }: { windowValue: string; onWindowChange: (value: string) => void }) {
  return <>
    <header className="trend-topbar">
      <label className="trend-search"><Search size={16} /><input aria-label="Search token, address, or paste link" placeholder="Search token, address, or paste link..." /></label>
      <div className="trend-tools"><div className="trend-time-tabs" aria-label="Market chart interval">{['1m', '5m', '15m', '1h', '4h', '24h'].map((value) => <button key={value} onClick={() => onWindowChange(value)} className={windowValue === value ? 'selected' : ''}>{value}</button>)}</div>
        <button className="trend-chain"><Layers3 size={17} /><b>Solana</b><ChevronDown size={13} /></button><button className="trend-icon-button" aria-label="Settings"><Settings size={18} /></button><button className="trend-icon-button" aria-label="Display settings"><Activity size={18} /></button><button className="trend-user" aria-label="User profile">D</button>
      </div>
    </header>
    <div className="trend-ticker" aria-label="Market prices">{coins.map(([name, price, change]) => <div className="trend-ticker-item" key={name}><span>{name}</span><b>{price}</b><em className={change.startsWith('-') ? 'negative' : ''}>{change}</em></div>)}</div>
  </>
}

function TokenBadge({ row, small = false }: { row: Pick<TokenRow, 'token' | 'tone'>; small?: boolean }) {
  return <span className={`trend-token trend-token-${row.tone} ${small ? 'small' : ''}`} aria-hidden="true">{row.token.slice(0, 1)}</span>
}

function Sparkline() {
  return <svg className="trend-sparkline" viewBox="0 0 105 34" aria-hidden="true"><path d="M1 29 11 24 18 26 26 16 34 21 43 17 49 24 57 12 64 19 72 6 79 11 88 3 94 8 104 1" fill="none" stroke="#00e88a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function StatCards() {
  const stats = [
    { title: 'Trending Now', value: '156', note: '+22%', icon: Flame, kind: 'flame' },
    { title: 'Volume (1h)', value: '$12.4M', note: '+42%', icon: ChartNoAxesCombined, kind: 'bars' },
    { title: 'New Pools', value: '23', note: '+35%', icon: Layers3, kind: 'layers' },
    { title: 'Smart Money Inflow', value: '$1.8M', note: '+61%', icon: Activity, kind: 'money' },
  ]
  return <div className="trend-stats-grid">{stats.map(({ title, value, note, icon: Icon, kind }) => <article className="trend-stat-card" key={title}><span className="trend-stat-icon"><Icon size={29} strokeWidth={2.4} fill={kind === 'flame' ? 'currentColor' : 'none'} /></span><div className="trend-stat-copy"><span>{title}</span><b>{value}</b><small>{note}</small></div><Sparkline /></article>)}</div>
}

function SocialChart() {
  return <section className="trend-panel social-panel"><div className="trend-panel-title"><h2>Mentions &amp; Social Trend</h2><div className="trend-chart-legend"><span><i className="legend-mentions" />Mentions</span><span><i className="legend-volume" />Volume</span><span><i className="legend-price" />Price</span></div></div>
    <div className="social-chart"><div className="social-y-label">Mentions</div><div className="social-axis left"><span>800</span><span>600</span><span>400</span><span>200</span><span>0</span></div><div className="social-axis right"><span>$8M</span><span>$6M</span><span>$4M</span><span>$2M</span><span>$0</span></div>
      <svg viewBox="0 0 500 170" preserveAspectRatio="none" aria-label="Social mentions, volume, and price over the last 12 hours"><defs><linearGradient id="mentionsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00e88a" stopOpacity=".18" /><stop offset="1" stopColor="#00e88a" stopOpacity="0" /></linearGradient></defs>{[12, 48, 84, 120, 156].map((y) => <line key={y} x1="0" x2="500" y1={y} y2={y} className="social-gridline" />)}<path d="M0 121 18 113 29 107 40 111 53 99 65 94 77 85 90 92 102 79 114 73 127 83 140 67 153 74 165 56 178 66 191 52 204 61 217 44 229 63 241 54 253 66 265 48 278 58 290 51 303 62 316 39 328 56 340 48 352 58 365 32 378 48 391 23 403 39 416 19 428 34 440 24 453 41 466 13 479 29 490 7 500 17V170H0Z" fill="url(#mentionsFill)" /><path d="M0 121 18 113 29 107 40 111 53 99 65 94 77 85 90 92 102 79 114 73 127 83 140 67 153 74 165 56 178 66 191 52 204 61 217 44 229 63 241 54 253 66 265 48 278 58 290 51 303 62 316 39 328 56 340 48 352 58 365 32 378 48 391 23 403 39 416 19 428 34 440 24 453 41 466 13 479 29 490 7 500 17" className="social-line mentions" /><path d="M0 148 22 145 37 143 55 140 71 144 87 137 103 132 119 137 137 127 153 130 169 121 188 125 204 115 221 123 238 117 256 125 273 113 290 121 307 109 325 115 343 102 359 108 377 95 394 103 411 91 429 94 446 82 464 89 480 74 500 51" className="social-line volume" /><path d="M0 135 20 134 34 128 52 126 69 128 87 118 103 122 122 112 139 119 156 108 174 112 193 100 209 110 227 103 244 108 261 93 279 101 296 96 314 103 332 88 350 91 367 82 384 92 402 70 419 78 437 61 455 65 472 48 486 33 500 17" className="social-line price" /></svg>
      <div className="social-x-axis"><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span><span>22:00</span></div>
    </div>
  </section>
}

function CategoryPanel() {
  const distribution = [['Meme', '42%', 'mint'], ['AI', '18%', 'green'], ['DeFi', '15%', 'sand'], ['RWA', '10%', 'cream'], ['GameFi', '8%', 'rose'], ['DePIN', '5%', 'pink'], ['Others', '2%', 'violet']]
  return <section className="trend-panel category-panel"><div className="trend-panel-title"><h2>Category Distribution</h2></div><div className="category-content"><div className="category-donut"><div><b>156</b><span>Trending</span></div></div><ul>{distribution.map(([name, value, color]) => <li key={name}><i className={`category-dot ${color}`} /><span>{name}</span><b>{value}</b></li>)}</ul></div></section>
}

function DataTable<T extends { rank: number }>({ columns, rows, label, className = '' }: { columns: Column<T>[]; rows: T[]; label: string; className?: string }) {
  return <div className={`trend-table-scroll ${className}`}><table className="trend-table"><caption className="sr-only">{label}</caption><thead><tr>{columns.map((column) => <th key={column.key} className={column.className}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.rank}>{columns.map((column) => <td key={column.key} className={column.className}>{column.render(row)}</td>)}</tr>)}</tbody></table></div>
}

function TokenCell({ row }: { row: TokenRow }) { return <span className="trend-token-cell"><TokenBadge row={row} /><span>{row.token}</span></span> }

function GainersPanel() {
  const gainers = tokens.slice(0, 5)
  const columns: Column<TokenRow>[] = [
    { key: 'rank', label: '#', render: (row) => row.rank },
    { key: 'token', label: '◉　Token', render: (row) => <TokenCell row={row} /> },
    { key: 'change', label: 'Change', className: 'align-right positive-cell', render: (row) => row.change },
  ]
  return <section className="trend-panel gainers-panel"><div className="trend-panel-title"><h2>Top Gainers (1h)</h2></div><DataTable columns={columns} rows={gainers} label="Top token gainers" className="gainers-table" /></section>
}

function OpportunityTable({ rows }: { rows: TokenRow[] }) {
  const columns: Column<TokenRow>[] = [
    { key: 'rank', label: '#', render: (row) => row.rank },
    { key: 'token', label: '◉　Token / Pair', render: (row) => <TokenCell row={row} /> },
    { key: 'mc', label: 'MC', className: 'align-right', render: (row) => row.mc },
    { key: 'price', label: 'Price', className: 'align-right', render: (row) => row.price },
    { key: 'change', label: '1h %', className: 'align-right positive-cell', render: (row) => row.change },
    { key: 'volume', label: 'Volume (1h)', className: 'align-right', render: (row) => row.volume },
    { key: 'fd1', label: 'FD 1m', className: 'align-right', render: (row) => row.fd1 },
    { key: 'fd5', label: 'FD 5m', className: 'align-right', render: (row) => row.fd5 },
    { key: 'fd15', label: 'FD 15m', className: 'align-right', render: (row) => row.fd15 },
    { key: 'age', label: 'Age', className: 'align-right', render: (row) => row.age },
    { key: 'smart', label: 'Smart Money', className: 'align-right', render: (row) => <b className={row.smartMoney.startsWith('-') ? 'negative-cell' : 'positive-cell'}>{row.smartMoney}</b> },
    { key: 'score', label: 'Score', className: 'align-right score-cell', render: (row) => row.score },
    { key: 'action', label: 'Action', className: 'align-right', render: () => <button className="trend-analyze">Analyze</button> },
  ]
  return <DataTable columns={columns} rows={rows} label="Trending opportunities in real time" className="opportunity-table" />
}

function FilterControls({ category, onCategory, filters, setFilters, reset }: { category: string; onCategory: (value: string) => void; filters: { minMc: string; maxMc: string; minVolume: string; age: string }; setFilters: (key: keyof typeof filters, value: string) => void; reset: () => void }) {
  return <div className="trend-filter-row"><div className="trend-category-filters" role="group" aria-label="Filter opportunities by category"><button className={category === 'All' ? 'active' : ''} onClick={() => onCategory('All')}>All</button>{categories.map(({ name, mark, tone }) => <button key={name} className={category === name ? 'active' : ''} onClick={() => onCategory(name)}><i className={`category-chip-icon ${tone}`}>{mark}</i>{name}</button>)}</div><div className="trend-select-filters">
    <label><span className="sr-only">Minimum market cap</span><select value={filters.minMc} onChange={(event) => setFilters('minMc', event.target.value)}><option value="0">Min MC</option><option value="0.5">$500K+</option><option value="1">$1M+</option><option value="5">$5M+</option></select><ChevronDown size={13} /></label>
    <label><span className="sr-only">Maximum market cap</span><select value={filters.maxMc} onChange={(event) => setFilters('maxMc', event.target.value)}><option value="100">Max MC</option><option value="1">$1M</option><option value="3">$3M</option><option value="10">$10M</option></select><ChevronDown size={13} /></label>
    <label><span className="sr-only">Minimum volume</span><select value={filters.minVolume} onChange={(event) => setFilters('minVolume', event.target.value)}><option value="0">Min Volume</option><option value="0.5">$500K+</option><option value="1">$1M+</option><option value="2">$2M+</option></select><ChevronDown size={13} /></label>
    <label><span className="sr-only">Pool age</span><select value={filters.age} onChange={(event) => setFilters('age', event.target.value)}><option value="9999">Age</option><option value="24">Under 1d</option><option value="168">Under 7d</option><option value="720">Under 30d</option></select><ChevronDown size={13} /></label>
    <button className="trend-reset" onClick={reset}><Funnel size={16} />Reset</button>
  </div></div>
}

export default function TrendingPage() {
  const [windowValue, setWindowValue] = useState('1h')
  const [category, setCategory] = useState('All')
  const [filters, setFilterState] = useState({ minMc: '0', maxMc: '100', minVolume: '0', age: '9999' })
  const visibleRows = useMemo(() => tokens.filter((row) => (category === 'All' || row.category === category) && row.mcValue >= Number(filters.minMc) && row.mcValue <= Number(filters.maxMc) && row.volumeValue >= Number(filters.minVolume) && row.ageHours <= Number(filters.age)), [category, filters])
  const updateFilter = (key: keyof typeof filters, value: string) => setFilterState((current) => ({ ...current, [key]: value }))
  const resetFilters = () => { setCategory('All'); setFilterState({ minMc: '0', maxMc: '100', minVolume: '0', age: '9999' }) }

  return <div className="trend-shell"><Sidebar /><main className="trend-main"><Header windowValue={windowValue} onWindowChange={setWindowValue} /><div className="trend-content">
    <div className="trend-page-heading"><div><h1>Trending Opportunities</h1><p>Discover tokens gaining momentum with strong LP activity</p></div><div className="trend-page-tabs" aria-label="Trending time range">{['1h', '4h', '24h'].map((value) => <button key={value} onClick={() => setWindowValue(value)} className={windowValue === value ? 'selected' : ''}>{value}</button>)}</div></div>
    <StatCards />
    <div className="trend-overview-grid"><SocialChart /><CategoryPanel /><GainersPanel /></div>
    <FilterControls category={category} onCategory={setCategory} filters={filters} setFilters={updateFilter} reset={resetFilters} />
    <section className="trend-panel main-table-panel"><div className="trend-panel-title"><h2>Trending Opportunities <span>(Real-time)</span></h2><span className="row-count">{visibleRows.length} tokens</span></div><OpportunityTable rows={visibleRows} /></section>
  </div></main></div>
}
