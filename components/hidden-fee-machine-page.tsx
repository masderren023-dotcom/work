'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity, ArrowRight, Bell, BookOpen, ChartNoAxesCombined, ChevronDown, Flame, Filter,
  Gem, Grid2X2, Layers3, LineChart, Search, Settings, ShieldCheck, Star, Trophy, Users,
  Wallet, Zap, RefreshCw, Sparkles, X,

} from 'lucide-react'
import styles from './hidden-fee-machine-page.module.css'

type Pool = {
  rank: number
  token: string
  category: string
  marketCap: number
  marketCapLabel: string
  age: string
  ageHours: number
  fd1: number
  fd5: number
  fd15: number
  activeTvl: number
  activeTvlLabel: string
  inactiveTvlLabel: string
  lpCount: number
  competition: 'LOW' | 'MED' | 'HIGH'
  hiddenScore: number
  safety: number
  momentum: number
  smartMoney: number
  tier: 'S Tier' | 'A Tier' | 'B Tier'
  tone: string
  rating: 'Early' | 'Growing' | 'Crowding' | 'Saturated'
  range: string
  buffer: string
}

type TableColumn<T> = {
  key: string
  title: string
  render: (row: T) => ReactNode
  className?: string
}

const market = [
  ['SOL', '$238.41', '+3.8%'], ['ETH', '$3,912.07', '+1.1%'], ['BTC', '$101,482.5', '+0.6%'],
  ['JUP', '$0.84', '+4.2%'], ['RAY', '$3.21', '+2.1%'], ['MNDE', '$0.12', '-1.3%'],
  ['POPCAT', '$0.28', '-2.1%'], ['BONK', '$0.000024', '+1.9%'], ['WIF', '$1.24', '+6.3%'],
  ['MEW', '$0.0042', '-0.8%'],
]

const categories = [
  { name: 'Meme', mark: 'M', tone: 'mint' }, { name: 'AI', mark: 'A', tone: 'blue' },
  { name: 'DeFi', mark: 'D', tone: 'violet' }, { name: 'RWA', mark: 'R', tone: 'cyan' },
  { name: 'GameFi', mark: 'G', tone: 'green' }, { name: 'DePIN', mark: 'P', tone: 'orange' },
  { name: 'Others', mark: 'O', tone: 'gold' },
]

const pools: Pool[] = [
  { rank: 1, token: 'Z500', category: 'Meme', marketCap: 1.24, marketCapLabel: '$1.24M', age: '8d', ageHours: 192, fd1: .0031, fd5: .0028, fd15: .0022, activeTvl: 28.4, activeTvlLabel: '$28.4K', inactiveTvlLabel: '$12.1K', lpCount: 86, competition: 'LOW', hiddenScore: 94, safety: 92, momentum: 88, smartMoney: 86, tier: 'S Tier', tone: 'mint', rating: 'Early', range: '$0.00116 – $0.00134', buffer: '12%' },
  { rank: 2, token: 'BUSHIT', category: 'Meme', marketCap: .82, marketCapLabel: '$820K', age: '2d', ageHours: 48, fd1: .0028, fd5: .0022, fd15: .0016, activeTvl: 26.1, activeTvlLabel: '$26.1K', inactiveTvlLabel: '$8.4K', lpCount: 64, competition: 'LOW', hiddenScore: 92, safety: 90, momentum: 84, smartMoney: 82, tier: 'S Tier', tone: 'gold', rating: 'Early', range: '$0.00076 – $0.00089', buffer: '14%' },
  { rank: 3, token: 'FROG', category: 'Meme', marketCap: 2.14, marketCapLabel: '$2.14M', age: '12d', ageHours: 288, fd1: .0026, fd5: .0021, fd15: .0015, activeTvl: 32.4, activeTvlLabel: '$32.4K', inactiveTvlLabel: '$18.2K', lpCount: 72, competition: 'LOW', hiddenScore: 89, safety: 86, momentum: 82, smartMoney: 80, tier: 'S Tier', tone: 'green', rating: 'Growing', range: '$0.00201 – $0.00229', buffer: '11%' },
  { rank: 4, token: 'HEEHAW', category: 'Meme', marketCap: 1.28, marketCapLabel: '$1.28M', age: '3d', ageHours: 72, fd1: .0027, fd5: .0020, fd15: .0014, activeTvl: 38.2, activeTvlLabel: '$38.2K', inactiveTvlLabel: '$10.4K', lpCount: 68, competition: 'LOW', hiddenScore: 86, safety: 84, momentum: 78, smartMoney: 76, tier: 'A Tier', tone: 'cream', rating: 'Growing', range: '$0.00119 – $0.00136', buffer: '10%' },
  { rank: 5, token: 'A116Z', category: 'AI', marketCap: 6.21, marketCapLabel: '$6.21M', age: '8d', ageHours: 192, fd1: .0024, fd5: .0019, fd15: .0012, activeTvl: 42.1, activeTvlLabel: '$42.1K', inactiveTvlLabel: '$28.7K', lpCount: 94, competition: 'LOW', hiddenScore: 82, safety: 80, momentum: 74, smartMoney: 72, tier: 'A Tier', tone: 'cream', rating: 'Growing', range: '$0.00578 – $0.00648', buffer: '9%' },
  { rank: 6, token: 'DREFTY', category: 'Meme', marketCap: 3.21, marketCapLabel: '$3.21M', age: '5d', ageHours: 120, fd1: .0023, fd5: .0018, fd15: .0012, activeTvl: 52.4, activeTvlLabel: '$52.4K', inactiveTvlLabel: '$21.6K', lpCount: 102, competition: 'MED', hiddenScore: 78, safety: 76, momentum: 72, smartMoney: 68, tier: 'A Tier', tone: 'cream', rating: 'Crowding', range: '$0.00301 – $0.00341', buffer: '8%' },
  { rank: 7, token: 'CATG', category: 'GameFi', marketCap: .88, marketCapLabel: '$880K', age: '12d', ageHours: 288, fd1: .0015, fd5: .0011, fd15: .0008, activeTvl: 24.1, activeTvlLabel: '$24.1K', inactiveTvlLabel: '$12.4K', lpCount: 56, competition: 'LOW', hiddenScore: 76, safety: 74, momentum: 68, smartMoney: 66, tier: 'A Tier', tone: 'gold', rating: 'Growing', range: '$0.00081 – $0.00094', buffer: '13%' },
  { rank: 8, token: 'DGN', category: 'DePIN', marketCap: 6.23, marketCapLabel: '$6.23M', age: '12d', ageHours: 288, fd1: .0015, fd5: .0010, fd15: .0007, activeTvl: 62.3, activeTvlLabel: '$62.3K', inactiveTvlLabel: '$28.9K', lpCount: 118, competition: 'MED', hiddenScore: 72, safety: 70, momentum: 66, smartMoney: 62, tier: 'B Tier', tone: 'orange', rating: 'Crowding', range: '$0.00594 – $0.00651', buffer: '7%' },
  { rank: 9, token: 'SILY', category: 'Meme', marketCap: .48, marketCapLabel: '$480K', age: '3d', ageHours: 72, fd1: .0014, fd5: .0009, fd15: .0006, activeTvl: 48.1, activeTvlLabel: '$48.1K', inactiveTvlLabel: '$16.2K', lpCount: 84, competition: 'LOW', hiddenScore: 68, safety: 66, momentum: 62, smartMoney: 58, tier: 'B Tier', tone: 'cream', rating: 'Growing', range: '$0.00045 – $0.00051', buffer: '10%' },
  { rank: 10, token: 'MEOW', category: 'Others', marketCap: 2.87, marketCapLabel: '$2.87M', age: '4d', ageHours: 96, fd1: .0014, fd5: .0009, fd15: .0006, activeTvl: 38.4, activeTvlLabel: '$14.8K', inactiveTvlLabel: '$14.8K', lpCount: 76, competition: 'LOW', hiddenScore: 64, safety: 62, momentum: 58, smartMoney: 56, tier: 'B Tier', tone: 'cream', rating: 'Saturated', range: '$0.00269 – $0.00293', buffer: '6%' },
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
      <div className="trend-tools"><div className="trend-time-tabs" aria-label="Market interval">{['1m', '5m', '15m', '1h', '4h', '24h'].map((value) => <button key={value} onClick={() => setInterval(value)} className={interval === value ? 'selected' : ''}>{value}</button>)}</div>
        <button className="trend-chain"><Layers3 size={17} /><b>Solana</b><ChevronDown size={13} /></button><button className="trend-icon-button" aria-label="Settings"><Settings size={18} /></button><button className="trend-user" aria-label="User profile">D</button>
      </div>
    </header>
    <div className="trend-ticker" aria-label="Market prices">{market.map(([name, price, change]) => <div className="trend-ticker-item" key={name}><span>{name}</span><b>{price}</b><em className={change.startsWith('-') ? 'negative' : ''}>{change}</em></div>)}</div>
  </>
}

function TokenAvatar({ pool, small = false }: { pool: Pick<Pool, 'token' | 'tone'>; small?: boolean }) {
  return <span className={`trend-token trend-token-${pool.tone} ${small ? 'small' : ''}`} aria-hidden="true">{pool.token.slice(0, 1)}</span>
}

function DataTable<T extends { rank: number }>({ columns, rows, label, className = '' }: { columns: TableColumn<T>[]; rows: T[]; label: string; className?: string }) {
  return <div className={`trend-table-scroll ${className}`}><table className="trend-table"><caption className="sr-only">{label}</caption><thead><tr>{columns.map((column) => <th key={column.key} className={column.className}>{column.title}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row) => <tr key={row.rank}>{columns.map((column) => <td key={column.key} className={column.className}>{column.render(row)}</td>)}</tr>) : <tr><td colSpan={columns.length} className={styles.empty}>No pools match these filters.</td></tr>}</tbody></table></div>
}

function TokenCell({ pool }: { pool: Pool }) {
  return <span className={styles.tokenPair}><TokenAvatar pool={pool} /><span>{pool.token} / SOL</span></span>
}

function Sparkline({ tone = 'green' }: { tone?: string }) {
  return <svg className={styles.sparkline} viewBox="0 0 100 30" aria-hidden="true"><path d="M1 25 10 21 17 24 25 15 33 19 41 16 48 21 57 10 64 15 71 6 78 11 86 4 93 8 99 2" fill="none" stroke={tone === 'red' ? '#ff4055' : '#00e88a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function MetricCards() {
  const stats = [
    { label: 'Avg FD 1m', value: '0.0031', delta: '+24%', icon: Flame, color: 'green' },
    { label: 'Avg FD 5m', value: '0.0028', delta: '+18%', icon: ChartNoAxesCombined, color: 'green' },
    { label: 'Avg FD 15m', value: '0.0022', delta: '+12%', icon: Activity, color: 'green' },
    { label: 'Hidden Candidates', value: '247', delta: '+30%', icon: Gem, color: 'red' },
    { label: 'S Tier', value: '18', delta: '+5', icon: Trophy, color: 'gold' },
    { label: 'A Tier', value: '63', delta: '+11', icon: Sparkles, color: 'blue' },
    { label: 'B Tier', value: '166', delta: '+22', icon: Layers3, color: 'green' },
  ]
  const iconTone: Record<string, string> = { green: styles.metricGreen, red: styles.metricRed, gold: styles.metricGold, blue: styles.metricBlue }
  return <div className={styles.metricGrid}>{stats.map(({ label, value, delta, icon: Icon, color }, index) => <article className={styles.metricCard} key={label}>
    <span className={`${styles.metricIcon} ${iconTone[color]}`}><Icon size={25} strokeWidth={2.4} fill={index === 0 || index === 4 ? 'currentColor' : 'none'} /></span>
    <div className={styles.metricCopy}><span>{label}</span><b>{value}</b><small>{delta}</small></div><Sparkline tone={index === 3 ? 'red' : 'green'} />
  </article>)}</div>
}

function TierFilters({ tier, setTier, category, setCategory, sort, setSort, reset }: {
  tier: string; setTier: (value: string) => void; category: string; setCategory: (value: string) => void
  sort: string; setSort: (value: string) => void; reset: () => void
}) {
  const tiers = ['All Pools', 'S Tier', 'A Tier', 'B Tier']
  return <>
    <div className={styles.filterTop}>
      <div className={`${styles.chipGroup} ${styles.tierGroup}`} role="group" aria-label="Filter by tier">{tiers.map((value) => <button key={value} className={tier === value ? styles.selected : ''} onClick={() => setTier(value)}>{value}</button>)}</div>
      <div className={`${styles.chipGroup} ${styles.categoryGroup}`} role="group" aria-label="Filter by category">{categories.map(({ name, mark, tone }) => <button key={name} className={category === name ? styles.selected : ''} onClick={() => setCategory(category === name ? 'All' : name)}><i className={`${styles.categoryIcon} ${styles[tone]}`}>{mark}</i>{name}</button>)}</div>
      <label className={styles.sortSelect}><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort pools"><option value="score">Hidden Score</option><option value="fd1">FD 1m</option><option value="age">Pool Age</option><option value="tvl">Active TVL</option></select><ChevronDown size={13} /></label>
      <button className={styles.utilityButton} onClick={() => document.getElementById('hfm-advanced-filters')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}><Filter size={16} />Filters</button>
      <button className={styles.utilityButton} onClick={reset}><RefreshCw size={15} />Reset</button>
    </div>
  </>
}

function SelectFilter({ label, values, value, onChange }: { label: string; values: string[]; value: string; onChange: (value: string) => void }) {
  return <label className={styles.selectFilter}><span>{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>{values.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={13} /></label>
}

function RankingTable({ rows, onAnalyze }: { rows: Pool[]; onAnalyze: (pool: Pool) => void }) {
  const columns: TableColumn<Pool>[] = [
    { key: 'rank', title: '#', render: (pool) => pool.rank },
    { key: 'token', title: '◉　Token / Pair', render: (pool) => <TokenCell pool={pool} /> },
    { key: 'mc', title: 'MC', className: 'align-right', render: (pool) => pool.marketCapLabel },
    { key: 'age', title: 'Age', className: 'align-right', render: (pool) => pool.age },
    { key: 'fd1', title: 'FD 1m', className: styles.feeValue, render: (pool) => <><span>{pool.fd1.toFixed(4)}</span><small>+{Math.round(pool.fd1 * 5800)}%</small></> },
    { key: 'fd5', title: 'FD 5m', className: styles.feeValue, render: (pool) => <><span>{pool.fd5.toFixed(4)}</span><small>+{Math.round(pool.fd5 * 4300)}%</small></> },
    { key: 'fd15', title: 'FD 15m', className: styles.feeValue, render: (pool) => <><span>{pool.fd15.toFixed(4)}</span><small>+{Math.round(pool.fd15 * 2900)}%</small></> },
    { key: 'active', title: 'Active TVL', className: 'align-right', render: (pool) => pool.activeTvlLabel },
    { key: 'inactive', title: 'Inactive TVL', className: 'align-right', render: (pool) => pool.inactiveTvlLabel },
    { key: 'lp', title: 'LP Count', className: 'align-right', render: (pool) => pool.lpCount },
    { key: 'competition', title: 'Competition', className: 'align-right', render: (pool) => <span className={`${styles.competition} ${styles[pool.competition.toLowerCase()]}`}>{pool.competition}</span> },
    { key: 'score', title: 'Hidden Score', className: styles.scoreColumn, render: (pool) => <b className={`${styles.scorePill} ${pool.hiddenScore > 85 ? styles.scoreHigh : ''}`}>{pool.hiddenScore}</b> },
    { key: 'safety', title: 'Safety', className: styles.scoreColumn, render: (pool) => <b className={styles.subScore}>{pool.safety}</b> },
    { key: 'momentum', title: 'Momentum', className: styles.scoreColumn, render: (pool) => <b className={styles.subScore}>{pool.momentum}</b> },
    { key: 'smart', title: 'Smart Money', className: styles.scoreColumn, render: (pool) => <b className={styles.subScore}>{pool.smartMoney}</b> },
    { key: 'action', title: 'Action', className: 'align-right', render: (pool) => <button className="trend-analyze" onClick={() => onAnalyze(pool)}>Analyze</button> },
  ]
  return <DataTable columns={columns} rows={rows} label="Hidden fee machine pool rankings" className={styles.rankingTable} />
}

function ScoreBreakdown({ pool }: { pool: Pool }) {
  return <section className={`trend-panel ${styles.analysisPanel} ${styles.breakdownPanel}`}>
    <div className="trend-panel-title"><h2>Hidden Score Breakdown</h2></div>
    <div className={styles.breakdownBody}>
      <div className={styles.scoreDonut}><div><b>{pool.hiddenScore}</b><span>Hidden Score</span></div></div>
      <ul className={styles.scoreLegend}>{[
        ['Fee Density', '35%', 'mint'], ['Low Competition', '25%', 'green'], ['Safety', '15%', 'sand'], ['Momentum', '15%', 'rose'], ['Smart Money', '10%', 'violet'],
      ].map(([label, value, color]) => <li key={label}><i className={styles[color]} /><span>{label}</span><b>{value}</b></li>)}</ul>
    </div>
  </section>
}

function OpportunityStatus({ pool }: { pool: Pool }) {
  const stages = ['Early', 'Growing', 'Crowding', 'Saturated']
  const selected = stages.indexOf(pool.rating)
  return <section className={`trend-panel ${styles.analysisPanel}`}>
    <div className="trend-panel-title"><h2>Opportunity Status</h2><span className={`${styles.statusPill} ${styles[`status${pool.rating}`]}`}>{pool.rating}</span></div>
    <div className={styles.statusTrack}>{stages.map((stage, index) => <div className={`${styles.statusStage} ${index <= selected ? styles.stageActive : ''}`} key={stage}><i /><span>{stage}</span></div>)}</div>
    <p className={styles.statusText}>{pool.token} is in the <b>{pool.rating.toLowerCase()}</b> window, with {pool.competition.toLowerCase()} competition and fee density above the market average.</p>
    <div className={styles.statusStats}><span>Pool age <b>{pool.age}</b></span><span>LP count <b>{pool.lpCount}</b></span></div>
  </section>
}

function CategoryPanel() {
  const values = [['Meme', 42, 'mint'], ['AI', 18, 'green'], ['DeFi', 15, 'cyan'], ['RWA', 10, 'sand'], ['GameFi', 8, 'rose'], ['DePIN', 5, 'pink'], ['Others', 2, 'violet']]
  return <section className={`trend-panel ${styles.analysisPanel} ${styles.categoryPanel}`}>
    <div className="trend-panel-title"><h2>Top Categories (Hidden Score)</h2></div>
    <div className={styles.categoryBars}>{values.map(([name, value, tone]) => <div className={styles.categoryBarRow} key={String(name)}><span className={`${styles.categoryDot} ${styles[String(tone)]}`} /><span>{String(name)}</span><div><i style={{ width: `${Number(value) * 2}%` }} /></div><b>{value}%</b></div>)}</div>
  </section>
}

function RecommendedEntry({ pool }: { pool: Pool }) {
  return <section className={`trend-panel ${styles.analysisPanel} ${styles.entryPanel}`}>
    <div className="trend-panel-title"><h2>Recommended Entry</h2><ShieldCheck size={15} className={styles.entryShield} /></div>
    <div className={styles.entryPrice}><span>Suggested LP Range</span><b>{pool.range}</b></div>
    <div className={styles.entryStats}><div><span>Safety Buffer</span><b>{pool.buffer}</b></div><div><span>Hidden Score</span><b>{pool.hiddenScore} <small>/ 100</small></b></div></div>
    <div className={styles.entryRating}><span>Opportunity Rating</span><b className={`${styles.statusPill} ${styles[`status${pool.rating}`]}`}>{pool.rating}</b></div>
  </section>
}

function AnalyzeDialog({ pool, onClose }: { pool: Pool; onClose: () => void }) {
  return <div className={styles.dialogBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="analyze-title">
      <button className={styles.dialogClose} onClick={onClose} aria-label="Close analysis"><X size={17} /></button>
      <span className={styles.dialogEyebrow}><Sparkles size={14} /> Hidden Fee Machine</span>
      <h2 id="analyze-title">{pool.token} / SOL</h2>
      <p>Fee density and pool conditions suggest a {pool.rating.toLowerCase()} opportunity.</p>
      <div className={styles.dialogGrid}><div><span>Suggested LP Range</span><b>{pool.range}</b></div><div><span>Safety Buffer</span><b>{pool.buffer}</b></div><div><span>Hidden Score</span><b>{pool.hiddenScore} / 100</b></div><div><span>Opportunity Rating</span><b>{pool.rating}</b></div></div>
      <button className={styles.dialogAction} onClick={onClose}>Done <ArrowRight size={15} /></button>
    </section>
  </div>
}

export default function HiddenFeeMachinePage() {
  const [tier, setTier] = useState('All Pools')
  const [category, setCategory] = useState('All')
  const [age, setAge] = useState('All')
  const [sort, setSort] = useState('score')
  const [minMc, setMinMc] = useState('All')
  const [maxMc, setMaxMc] = useState('All')
  const [minFd, setMinFd] = useState('All')
  const [minTvl, setMinTvl] = useState('All')
  const [competition, setCompetition] = useState('Any')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [hideCrowded, setHideCrowded] = useState(false)
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null)

  const visiblePools = useMemo(() => {
    const ageLimit: Record<string, number> = { '12h+': 12, '24h+': 24, '48h+': 48, '7d+': 168 }
    const minMarket: Record<string, number> = { 'All': 0, '$500K+': .5, '$1M+': 1, '$5M+': 5 }
    const maxMarket: Record<string, number> = { 'All': Number.POSITIVE_INFINITY, '$1M': 1, '$3M': 3, '$10M': 10 }
    const minFee: Record<string, number> = { 'All': 0, '0.0010+': .001, '0.0020+': .002, '0.0030+': .003 }
    const tvl: Record<string, number> = { 'All': 0, '$10K+': 10, '$25K+': 25, '$50K+': 50 }
    const filtered = pools.filter((pool) =>
      (tier === 'All Pools' || pool.tier === tier) &&
      (category === 'All' || pool.category === category) &&
      (age === 'All' || pool.ageHours >= ageLimit[age]) &&
      pool.marketCap >= minMarket[minMc] && pool.marketCap <= maxMarket[maxMc] &&
      pool.fd1 >= minFee[minFd] && pool.activeTvl >= tvl[minTvl] &&
      (competition === 'Any' || (competition === 'Low' ? pool.competition === 'LOW' : pool.competition !== 'HIGH')) &&
      (!hideCrowded || (pool.rating !== 'Crowding' && pool.rating !== 'Saturated')) &&
      (!verifiedOnly || pool.hiddenScore >= 80)
    )
    return filtered.sort((a, b) => sort === 'fd1' ? b.fd1 - a.fd1 : sort === 'age' ? a.ageHours - b.ageHours : sort === 'tvl' ? b.activeTvl - a.activeTvl : b.hiddenScore - a.hiddenScore).map((pool, index) => ({ ...pool, rank: index + 1 }))
  }, [tier, category, age, sort, minMc, maxMc, minFd, minTvl, competition, hideCrowded, verifiedOnly])

  const reset = () => {
    setTier('All Pools'); setCategory('All'); setAge('All'); setSort('score')
    setMinMc('All'); setMaxMc('All'); setMinFd('All'); setMinTvl('All'); setCompetition('Any')
    setVerifiedOnly(false); setHideCrowded(false)
  }

  const selectedForSummary = selectedPool ?? visiblePools[0] ?? pools[0]

  return <div className={`trend-shell ${styles.shell}`}><Sidebar /><main className="trend-main"><Header /><div className={`trend-content ${styles.content}`}>
    <header className={styles.pageHeading}><div><h1>Hidden Fee Machine</h1><p>Find overlooked pools with high fee density and low competition</p></div><aside className={styles.infoCallout}><div><b>What is Hidden Fee Machine?</b><span>Find pools with high fee density (fees generated/active TVL),<br className={styles.desktopBreak} /> low competition, and strong safety metrics before they get crowded.</span></div><button onClick={() => setSelectedPool(selectedForSummary)}>Learn More <ArrowRight size={14} /></button></aside></header>
    <MetricCards />
    <div className={styles.filterArea}>
      <TierFilters tier={tier} setTier={setTier} category={category} setCategory={setCategory} sort={sort} setSort={setSort} reset={reset} />
      <div className={styles.filterAdvanced} id="hfm-advanced-filters">
        <SelectFilter label="Min MC" values={['All', '$500K+', '$1M+', '$5M+']} value={minMc} onChange={setMinMc} />
        <SelectFilter label="Max MC" values={['All', '$1M', '$3M', '$10M']} value={maxMc} onChange={setMaxMc} />
        <div className={`${styles.chipGroup} ${styles.ageGroup}`} role="group" aria-label="Minimum pool age">{['12h+', '24h+', '48h+', '7d+'].map((value) => <button key={value} className={age === value ? styles.selected : ''} onClick={() => setAge(age === value ? 'All' : value)}>{value}</button>)}</div>
        <SelectFilter label="Min FD 1m" values={['All', '0.0010+', '0.0020+', '0.0030+']} value={minFd} onChange={setMinFd} />
        <SelectFilter label="Min Active TVL" values={['All', '$10K+', '$25K+', '$50K+']} value={minTvl} onChange={setMinTvl} />
        <SelectFilter label="Max Competition" values={['Low', 'Medium', 'Any']} value={competition} onChange={setCompetition} />
        <Toggle label="Verified Only" checked={verifiedOnly} onChange={setVerifiedOnly} />
        <Toggle label="Hide Crowded" checked={hideCrowded} onChange={setHideCrowded} />
      </div>
    </div>
    <section className={`trend-panel ${styles.tablePanel}`}>
      <div className={`trend-panel-title ${styles.tableTitle}`}><h2>Hidden Fee Machine <span>(Real-time)</span></h2><span className={styles.resultCount}>{visiblePools.length} pools</span></div>
      <RankingTable rows={visiblePools} onAnalyze={setSelectedPool} />
    </section>
    <div className={styles.analysisGrid}>
      <ScoreBreakdown pool={selectedForSummary} />
      <OpportunityStatus pool={selectedForSummary} />
      <CategoryPanel />
      <RecommendedEntry pool={selectedForSummary} />
    </div>
  </div></main>{selectedPool && <AnalyzeDialog pool={selectedPool} onClose={() => setSelectedPool(null)} />}</div>
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className={styles.toggleControl}><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i /></label>
}

