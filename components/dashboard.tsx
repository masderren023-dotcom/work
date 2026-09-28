'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  CandlestickChart,
  ChevronDown,
  Filter,
  Gem,
  Grid2X2,
  Layers3,
  LineChart,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Sun,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Grid2X2 },
  { label: 'Trending', href: '/trending', icon: CandlestickChart },
  { label: 'Hidden Fee Machine', href: '/hidden-fee-machine', icon: Zap },
  { label: 'Analyze Pool', href: '/analyze-pool', icon: LineChart },
  { label: 'Watchlist', href: '/watchlist', icon: Star },
  { label: 'Alerts', href: '/alerts', icon: Bell, badge: '3' },
  { label: 'Wallet Tracker', href: '/wallet-tracker', icon: Wallet },
  { label: 'Token Narrative', href: '/token-narrative', icon: BookOpen },
  { label: 'KOL Tracker', href: '/kol-tracker', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
]

const coins = [
  ['SOL', '$238.41', '+3.8%'], ['ETH', '$3,912.07', '+1.1%'], ['BTC', '$101,482.5', '+0.6%'],
  ['MOODENG', '$0.34', '-38.4%'], ['GIGA', '$12.3M', '+12.3%'], ['ZEREBRO', '$2.10', '-2.1%'],
  ['PNUT', '$1.84', '-11.2%'], ['AIXBT', '$0.89', '+18.9%'], ['BRETT', '$0.14', '-4.7%'],
  ['PEPE', '$0.00001', '+3.2%'], ['CHILLGUY', '$0.06', '-2.6%'], ['FARTCOIN', '$1.13', '+11.3%'],
]

const opportunities = [
  { token: 'POPCAT', pair: 'SOL', mc: '$28.4M', fd1: '0.0031', fd5: '0.0028', fd15: '0.0022', age: '8d', score: '88' },
  { token: 'WIF', pair: 'SOL', mc: '$42.1M', fd1: '0.0029', fd5: '0.0025', fd15: '0.0018', age: '12d', score: '85' },
  { token: 'BONK', pair: 'SOL', mc: '$1.28M', fd1: '0.0027', fd5: '0.0021', fd15: '0.0015', age: '24d', score: '78' },
  { token: 'Z500', pair: 'SOL', mc: '$1.24M', fd1: '0.0031', fd5: '0.0028', fd15: '0.0022', age: '36h', score: '94' },
  { token: 'BUSHIT', pair: 'SOL', mc: '$820K', fd1: '0.0028', fd5: '0.0022', fd15: '0.0016', age: '2d', score: '92' },
  { token: 'A116Z', pair: 'SOL', mc: '$6.21M', fd1: '0.0024', fd5: '0.0019', fd15: '0.0012', age: '8d', score: '82' },
  { token: 'HEEHAW', pair: 'SOL', mc: '$2.14M', fd1: '0.0026', fd5: '0.0020', fd15: '0.0014', age: '3d', score: '86' },
  { token: 'DREFTY', pair: 'SOL', mc: '$3.21M', fd1: '0.0023', fd5: '0.0018', fd15: '0.0012', age: '5d', score: '76' },
  { token: 'CATG', pair: 'SOL', mc: '$680K', fd1: '0.0021', fd5: '0.0015', fd15: '0.0010', age: '8d', score: '75' },
  { token: 'SOLACE', pair: 'SOL', mc: '$12.4M', fd1: '0.0020', fd5: '0.0014', fd15: '0.0009', age: '14d', score: '72' },
]

const hiddenFees = [
  ['Z500', '0.0031', '$18.4K', 'LOW', '36h', '94'], ['BUSHIT', '0.0028', '$26.1K', 'LOW', '2d', '92'],
  ['FROG', '0.0026', '$32.4K', 'LOW', '3d', '89'], ['MEOW', '0.0024', '$28.7K', 'LOW', '4d', '86'],
  ['A116Z', '0.0022', '$42.1K', 'MED', '8d', '82'], ['HEEHAW', '0.0020', '$38.2K', 'LOW', '3d', '86'],
  ['DREFTY', '0.0019', '$52.4K', 'MED', '5d', '76'], ['CATG', '0.0016', '$24.1K', 'LOW', '8d', '75'],
  ['DGN', '0.0015', '$62.3K', 'MED', '12d', '72'], ['SILY', '0.0014', '$48.1K', 'HIGH', '3d', '68'],
]

function Token({ name, small = false }: { name: string; small?: boolean }) {
  const colors: Record<string, string> = {
    Z500: 'mint', BUSHIT: 'gold', HEEHAW: 'cream', POPCAT: 'pink', WIF: 'orange', BONK: 'blue',
    A116Z: 'rose', FROG: 'green', MEOW: 'lavender', DREFTY: 'coral', CATG: 'peach', SOLACE: 'violet',
  }
  return <span className={`token-avatar ${small ? 'token-small' : ''} token-${colors[name] || 'mint'}`} aria-hidden="true">{name.slice(0, 1)}</span>
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="panel"><div className="panel-heading"><h2>{title}</h2>{action}</div>{children}</section>
}

function ViewAll({ children = 'View All' }: { children?: string }) {
  return <button className="view-all">{children} <ArrowRight size={12} /></button>
}

function Sidebar() {
  const pathname = usePathname()
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark">D</div><div><strong>Darren Terminal</strong><span>v1.0&nbsp; LP Opportunity Finder</span></div></div>
    <div className="nav-caption">TERMINAL</div>
    <nav aria-label="Main navigation" className="nav-list">
      {navItems.map(({ label, href, icon: Icon, badge }) => {
        const active = pathname === href || (pathname === '/' && href === '/dashboard')
        return <Link key={label} href={href} className={`nav-link ${active ? 'nav-active' : ''}`} aria-current={active ? 'page' : undefined}>
          <Icon size={19} strokeWidth={2.1} /><span>{label}</span>{badge && <b className="nav-badge">{badge}</b>}
        </Link>
      })}
    </nav>
    <div className="sidebar-status">
      <div className="online"><i />System Online</div>
      {[['RPC', '72ms'], ['Meteora', '68ms'], ['GMGN', '124ms'], ['Jupiter', '86ms']].map(([name, latency]) => <div className="service-row" key={name}><span><i className="service-dot" />{name}</span><b>{latency}</b></div>)}
    </div>
    <div className="sidebar-footer"><div className="footer-mark"><Layers3 size={18} /></div><span>Darren Terminal v1.0.0<small>Built for LPs on Solana</small></span></div>
  </aside>
}

function Header() {
  return <>
    <header className="topbar">
      <label className="search-box"><Search size={16} /><input aria-label="Search token or address" placeholder="Search token, address, or paste link.." /></label>
      <div className="header-tools">
        <div className="time-tabs">{['1m', '5m', '15m', '1h', '4h', '24h'].map((item) => <button key={item} className={item === '1h' ? 'selected' : ''}>{item}</button>)}</div>
        <button className="chain-select"><Layers3 size={16} /><b>Solana</b><ChevronDown size={13} /></button>
        <button className="icon-button" aria-label="Light mode"><Sun size={17} /></button><button className="icon-button" aria-label="Dark mode"><Sun size={17} /></button>
        <button className="user-avatar" aria-label="User profile">D</button>
      </div>
    </header>
    <div className="ticker" aria-label="Market prices">{coins.map(([name, price, change]) => <div key={name} className="ticker-item"><span>{name}</span><b>{price}</b><em className={change.startsWith('-') ? 'negative' : ''}>{change}</em></div>)}</div>
  </>
}

function Sparkline({ color = '#00e68a' }: { color?: string }) {
  return <svg className="sparkline" viewBox="0 0 80 24" aria-hidden="true"><path d="M1 20 C8 19 8 15 14 16 S22 12 28 14 S37 5 43 10 S51 8 56 11 S66 2 70 6 S76 3 79 1" fill="none" stroke={color} strokeWidth="1.4" /></svg>
}

function MetricCards() {
  const metrics = [
    { label: 'Market Quality', value: 'GOOD', note: 'Fee opportunities are healthy', icon: Activity, kind: 'quality', trend: 'GOOD' },
    { label: 'Pools Scanned', value: '12,482', note: '+8.4%', icon: Layers3, kind: 'pools' },
    { label: 'Hidden Opportunities', value: '247', note: '+12.1%', icon: FlameIcon, kind: 'hidden' },
    { label: 'S Tier', value: '18', note: '+5', icon: Gem, kind: 'tier s' },
    { label: 'A Tier', value: '63', note: '+11', icon: Star, kind: 'tier a' },
    { label: 'B Tier', value: '166', note: '+22', icon: Layers3, kind: 'tier b' },
  ]
  return <div className="metrics-grid">{metrics.map(({ label, value, note, icon: Icon, kind, trend }) => <article key={label} className={`metric-card metric-${kind.replace(' ', '-')}`}>
    <div className="metric-icon"><Icon size={24} fill={kind.includes('tier') || kind === 'hidden' ? 'currentColor' : 'none'} /></div>
    <div className="metric-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
    {trend ? <b className="metric-tag">{trend}</b> : <Sparkline color={kind === 'tier s' ? '#ff344d' : '#00e68a'} />}
  </article>)}</div>
}

function FlameIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.2 2.4c.4 3.1-1 4.8-2.4 6.4-.7-1.6-.6-3.1-.1-4.3C6.5 7.4 4 10.6 4 14.4a8 8 0 0 0 16 0c0-4.6-2.4-8.3-6.8-12Zm-1.2 17.9a3 3 0 0 1-3-3c0-1.7 1.1-2.9 2.7-4.6.1 1.5.9 2.1 1.6 3.1.5.7.7 1.2.7 1.7a2 2 0 0 1-2 2.8Z" /></svg>
}

function FeeDensity() {
  return <Panel title="Market Fee Density (Average)">
    <div className="density-chart">
      <div className="axis-labels"><span>0.0060</span><span>0.0040</span><span>0.0020</span><span>0.0000</span></div>
      <div className="density-legend"><span><i className="dot green" />1m&nbsp;&nbsp; 0.0031&nbsp;&nbsp; <b>+18%</b></span><span><i className="dot purple" />5m&nbsp;&nbsp; 0.0028&nbsp;&nbsp; <b>+12%</b></span><span><i className="dot orange" />15m&nbsp; 0.0022&nbsp;&nbsp; <b>+6%</b></span></div>
      <svg viewBox="0 0 320 132" preserveAspectRatio="none" className="density-lines" aria-label="Fee density line chart">
        {[20, 54, 88, 122].map(y => <line key={y} x1="0" x2="320" y1={y} y2={y} className="chart-grid" />)}
        <path d="M0 78 C15 72 19 83 33 74 S54 79 69 72 S87 69 98 77 S116 71 129 73 S147 68 161 76 S178 80 193 69 S210 71 224 72 S241 65 255 69 S276 51 291 61 S306 55 320 51" className="line-green" />
        <path d="M0 93 C15 86 24 92 38 88 S57 90 72 84 S91 89 105 86 S122 82 137 91 S156 87 170 87 S189 84 204 90 S223 89 237 84 S254 88 271 81 S287 87 302 78 S313 82 320 79" className="line-orange" />
        <path d="M0 107 C18 105 21 101 37 104 S54 101 68 105 S85 100 99 106 S119 101 133 104 S153 99 168 105 S187 102 201 107 S220 100 237 104 S254 101 269 105 S289 97 304 103 S313 101 320 99" className="line-purple" />
      </svg>
      <div className="chart-times"><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span><span>20:00</span></div>
    </div>
  </Panel>
}

function MarketCap() {
  const bars = [['<100K', '32%', 78], ['100K-1M', '28%', 64], ['1M-5M', '22%', 48], ['5M-20M', '12%', 34], ['>20M', '6%', 19]]
  return <Panel title="Market Cap Distribution"><div className="bar-chart">{bars.map(([label, value, height]) => <div className="bar-group" key={label as string}><span>{value}</span><i style={{ height: `${height}px` }} /><small>{label}</small></div>)}</div></Panel>
}

function PoolTypes() {
  const items = [['Meme', '52%', 'mint'], ['AI', '18%', 'teal'], ['DeFi', '12%', 'sand'], ['RWA', '8%', 'cream'], ['GameFi', '6%', 'rose'], ['Others', '4%', 'lilac']]
  return <Panel title="Pool Type Distribution"><div className="donut-wrap"><div className="donut"><div><strong>12,482</strong><span>Total Pools</span></div></div><ul className="legend-list">{items.map(([name, value, color]) => <li key={name}><i className={`dot ${color}`} /><span>{name}</span><b>{value}</b></li>)}</ul></div></Panel>
}

function ScannerActivity() {
  const rows = [
    ['14:25:32', 'Scanned 12,482 pools', '247 opportunities'], ['14:25:18', 'Updated fee density data', '1m / 5m / 15m'],
    ['14:25:05', 'Checking new pools', '3 new pools detected'], ['14:24:51', 'Updated market data', '1,024 tokens updated'],
    ['14:24:38', 'Syncing with Meteora', 'RPC 72ms'], ['14:24:22', 'Scanning liquidity distribution', '12,482 pools scanned'],
    ['14:24:10', 'Found 3 new opportunities', '3 S tier, 11 A tier'], ['14:23:55', 'Updated hidden score data', 'Hidden fee data updated'],
  ]
  return <Panel title="Scanner Activity (Live)" action={<div className="scan-controls"><span className="live-dot" /> <b>Auto Scan</b><i className="toggle" /><button>1 min⌄</button></div>}>
    <div className="activity-list">{rows.map(([time, event, detail]) => <div className="activity-row" key={time}><time>{time}</time><span>{event}</span><b>{detail}</b></div>)}</div>
  </Panel>
}

function TokenRow({ name, pair = true }: { name: string; pair?: boolean }) {
  return <span className="token-label"><Token name={name} small /><span>{name}{pair && <small> / SOL</small>}</span></span>
}

function HiddenMachinePreview() {
  const rows = [
    ['Z500', 'High Fee Density', 'FD 0.0031', 'amber'], ['BUSHIT', 'New Pool', 'Bin 100', 'red'],
    ['A116Z', 'Volume Spike', '+240%', 'pink'], ['HEEHAW', 'S Tier Signal', 'Score 78 → 86', 'purple'],
  ]
  return <Panel title="Recent Opportunities" action={<ViewAll />}>
    <div className="compact-table"><div className="table-head"><span>Time</span><span>Token</span><span>Event</span><span>Details</span></div>{rows.map(([name, event, detail, color], i) => <div className="opportunity-row" key={name}><span>{['2m ago', '5m ago', '8m ago', '12m ago'][i]}</span><TokenRow name={name} /><b className={`event-${color}`}>{i === 0 ? '◉' : '⬟'}&nbsp; {event}</b><span>{detail}</span></div>)}</div>
  </Panel>
}

function HiddenMachines() {
  return <Panel title="Top Hidden Fee Machines Right Now" action={<ViewAll />}>
    <div className="compact-table machine-preview"><div className="table-head"><span>#</span><span>Token / Pair</span><span>Score</span><span>FD 1m</span><span>MC</span><span>Change</span></div>
      {['Z500', 'BUSHIT', 'HEEHAW'].map((name, i) => <div className="machine-preview-row" key={name}><span>{i + 1}</span><TokenRow name={name} /><b className="score">{[94, 92, 89][i]}</b><span>{['0.0031', '0.0028', '0.0026'][i]}</span><span>{['$1.24M', '$820K', '$2.14M'][i]}</span><b className={i === 2 ? 'negative' : 'positive'}>{['+12.4%', '+28.7%', '-6.2%'][i]}</b></div>)}
    </div>
  </Panel>
}

function Narratives() {
  const items = [['Meme', '42%', '73'], ['AI', '18%', '37'], ['DeFi', '15%', '30'], ['RWA', '12%', '25'], ['GameFi', '8%', '16'], ['DePIN', '5%', '11'], ['Others', '3%', '7']]
  return <Panel title="Top Narratives (1h)" action={<ViewAll>See All</ViewAll>}>
    <div className="narrative-list">{items.map(([name, value, width]) => <div className="narrative-row" key={name}><Token name={name} small /><span>{name}</span><i><b style={{ width: `${width}%` }} /></i><strong>{value}</strong></div>)}</div>
  </Panel>
}

function DataTable({ hidden = false }: { hidden?: boolean }) {
  return <Panel title={hidden ? 'Hidden Fee Machine' : 'Trending Opportunities (Hot Pools)'} action={<div className="time-tabs small-tabs">{['1m', '5m', '15m', '1h', '4h', '24h'].map((item) => <button className={item === '1h' ? 'selected' : ''} key={item}>{item}</button>)}</div>}>
    <div className="filter-row">{(hidden ? ['All', 'S Tier', 'A Tier', 'B Tier'] : ['All Pools', 'Meme', 'AI', 'DeFi', 'RWA', 'GameFi', 'Others']).map((item, i) => <button key={item} className={i === 0 ? 'filter-active' : ''}>{item}</button>)}{hidden && <button className="filter-button"><Filter size={12} /> Filters</button>}</div>
    <div className="data-table-wrap"><table className="data-table"><thead><tr>{hidden ? <><th>#</th><th>Token / Pair</th><th>FD 1m</th><th>Active TVL</th><th>Competition</th><th>Age</th><th>Score</th><th>Action</th></> : <><th>#</th><th>Token / Pair</th><th>MC</th><th>FD 1m</th><th>FD 5m</th><th>FD 15m</th><th>Age</th><th>Score</th><th>Action</th></>}</tr></thead>
      <tbody>{hidden ? hiddenFees.map((entry, idx) => <tr key={entry[0]}><td>{idx + 1}</td><td><TokenRow name={entry[0]} /></td><td>{entry[1]}</td><td>{entry[2]}</td><td><b className={`competition competition-${entry[3].toLowerCase()}`}>{entry[3]}</b></td><td>{entry[4]}</td><td className="score">{entry[5]}</td><td><button className="analyze">Analyze</button></td></tr>) : opportunities.map((entry, idx) => <tr key={entry.token}><td>{idx + 1}</td><td><TokenRow name={entry.token} /></td><td>{entry.mc}</td><td>{entry.fd1}</td><td>{entry.fd5}</td><td>{entry.fd15}</td><td>{entry.age}</td><td className="score">{entry.score}</td><td><button className="analyze">Analyze</button></td></tr>)}</tbody>
    </table></div>
  </Panel>
}

function SmartMoney() {
  const rows = [['Z500', '+$240K', '12', 'good'], ['BUSHIT', '+$182K', '8', 'good'], ['A116Z', '+$96K', '5', 'good'], ['HEEHAW', '-$42K', '3', 'bad'], ['DREFTY', '-$58K', '4', 'bad']]
  return <Panel title="Smart Money Activity" action={<ViewAll>See All</ViewAll>}>
    <div className="smart-head"><span>Token</span><span>Netflow (1h)</span><span>Smart Wallets</span><span>Trend</span></div>
    {rows.map(([name, flow, wallets, direction], i) => <div className="smart-row" key={name}><TokenRow name={name} pair={false} /><b className={direction === 'good' ? 'positive' : 'negative'}>{flow}</b><span>{wallets}</span><i className={`trendbar ${direction}`} style={{ width: `${[50, 38, 25, 20, 14][i]}%` }} /></div>)}
  </Panel>
}

function ScannerHealth() {
  return <Panel title="Scanner Health" action={<span className="health-status"><ShieldCheck size={11} /> All Systems Operational <ArrowRight size={11} /></span>}>
    <div className="health-grid">{[['RPC', '72ms'], ['Meteora', '68ms'], ['GMGN', '124ms'], ['Jupiter', '86ms']].map(([name, value]) => <div key={name}><span><i className="service-dot" />{name}</span><b>{value}</b></div>)}</div>
  </Panel>
}

export default function Dashboard() {
  return <div className="terminal-shell"><Sidebar /><main className="dashboard-main"><Header /><div className="dashboard-content">
    <MetricCards />
    <div className="overview-grid"><FeeDensity /><MarketCap /><PoolTypes /><ScannerActivity /></div>
    <div className="middle-grid"><HiddenMachines /><HiddenMachinePreview /><Narratives /></div>
    <div className="lower-grid"><DataTable /><DataTable hidden /><div className="right-stack"><SmartMoney /><ScannerHealth /></div></div>
  </div></main></div>
}

