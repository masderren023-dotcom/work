'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowDownRight, ArrowRight, Bell, BookOpen, ChartNoAxesCombined, ChevronDown,
  ExternalLink, Grid2X2, Layers3, LineChart, Search, Settings, ShieldCheck, Star,
  Users, Wallet, Zap,
} from 'lucide-react'
import styles from './analyze-pool-page.module.css'

const ticker = [
  ['SOL', '$238.41', '+3.8%'], ['ETH', '$3,912.07', '+1.1%'], ['BTC', '$101,482.5', '+0.6%'],
  ['JUP', '$0.84', '+4.2%'], ['RAY', '$3.21', '+2.1%'], ['MNDE', '$0.12', '-1.3%'],
  ['POPCAT', '$0.28', '-2.1%'], ['BONK', '$0.000024', '+1.9%'], ['WIF', '$1.24', '+6.3%'], ['MEW', '$0.0042', '-0.8%'],
]

const navigation = [
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
    <nav className="trend-nav" aria-label="Terminal navigation">{navigation.map(({ label, href, icon: Icon, badge }) => <Link key={label} href={href} className={`trend-nav-link ${pathname === href ? 'is-active' : ''}`} aria-current={pathname === href ? 'page' : undefined}><Icon size={21} strokeWidth={2} /><span>{label}</span>{badge && <b className="trend-badge">{badge}</b>}</Link>)}</nav>
    <div className="trend-sidebar-health"><div className="trend-online"><i />System Online</div>{['RPC|72ms', 'Meteora|68ms', 'GMGN|124ms', 'Jupiter|86ms'].map((entry) => { const [name, time] = entry.split('|'); return <div className="trend-service" key={name}><span><i />{name}</span><b>{time}</b></div> })}</div>
    <div className="trend-sidebar-footer"><span className="trend-footer-icon"><Users size={18} /></span><span>Darren Terminal v1.0.0<small>Built for LPs on Solana</small></span></div>
  </aside>
}

function Header() {
  return <><header className="trend-topbar"><label className="trend-search"><Search size={16} /><input aria-label="Search token, address, or paste link" placeholder="Search token, address, or paste link..." /></label><div className="trend-tools"><div className="trend-time-tabs" aria-label="Market chart interval">{['1m', '5m', '15m', '1h', '4h', '24h'].map((item) => <button key={item} className={item === '1h' ? 'selected' : ''}>{item}</button>)}</div><button className="trend-chain"><Layers3 size={17} /><b>Solana</b><ChevronDown size={13} /></button><button className="trend-icon-button" aria-label="Settings"><Settings size={18} /></button><button className="trend-user" aria-label="User profile">D</button></div></header><div className="trend-ticker" aria-label="Market prices">{ticker.map(([name, price, change]) => <div className="trend-ticker-item" key={name}><span>{name}</span><b>{price}</b><em className={change.startsWith('-') ? 'negative' : ''}>{change}</em></div>)}</div></>
}

function Panel({ title, detail, action, className = '', children }: { title: string; detail?: string; action?: ReactNode; className?: string; children: ReactNode }) {
  return <section className={`${styles.panel} ${className}`}><div className={styles.panelHeader}><h2>{title}{detail && <small>{detail}</small>}</h2>{action}</div>{children}</section>
}

function TokenProfile() {
  return <section className={`${styles.panel} ${styles.profileCard}`} aria-label="Token Profile">
    <div className={styles.profileIdentity}><span className={styles.tokenAvatar}>Z</span><div><span className={styles.eyebrow}>TOKEN PROFILE</span><h1>Z500 / SOL</h1><div className={styles.profileMeta}><span className={styles.tag}>Meme</span><span>7xK...gQ2v</span><span className={styles.copyMark} aria-hidden="true">⧉</span><span className={styles.chainMark}><Layers3 size={12} /> Solana</span></div></div></div>
    <div className={styles.profileMetrics}><div className={styles.hiddenScore}><span>Hidden Score</span><b>94</b><em>S Tier</em></div><Metric label="MC Now" value="$1.24M" detail="+12.4%" tone="positive" /><Metric label="ATH MC" value="$8.32M" /><Metric label="Drawdown" value="−85.1%" tone="negative" /><Metric label="Age" value="8d" /><Metric label="Holders" value="1,248" /></div>
  </section>
}

type Tone = 'positive' | 'negative' | 'muted'
function Metric({ label, value, detail, tone }: { label: string; value: string; detail?: string; tone?: Tone }) {
  return <div className={styles.metric}><span>{label}</span><strong className={tone ? styles[tone] : undefined}>{value}</strong>{detail && <small className={tone ? styles[tone] : undefined}>{detail}</small>}</div>
}

function ChartPlaceholder() {
  return <div className={styles.chartFrame} aria-label="Dexscreener chart placeholder">
    <div className={styles.chartToolbar}><div><b className={styles.chartCoin}>Z</b><span><strong>Z500/SOL · 1h · Raydium</strong><small>O 1.21M&nbsp; H 1.26M&nbsp; L 1.18M&nbsp; C 1.24M&nbsp; +0.03M (+2.4%)</small></span></div><span className={styles.chartLive}><i /> Dexscreener preview</span></div>
    <div className={styles.chartBody}><div className={styles.chartGrid} aria-hidden="true"><span>8.0M</span><span>6.0M</span><span>4.0M</span><span>2.0M</span><span>1.24M</span><span>0</span></div><svg viewBox="0 0 720 250" preserveAspectRatio="none" role="img" aria-label="Sample Z500 market chart"><defs><linearGradient id="sampleArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#00d986" stopOpacity=".22" /><stop offset="100%" stopColor="#00d986" stopOpacity="0" /></linearGradient></defs><path d="M0 195 L35 179 L60 188 L92 162 L122 177 L154 143 L186 152 L218 98 L248 119 L277 69 L309 91 L340 134 L370 119 L404 150 L435 128 L466 163 L498 148 L528 185 L559 171 L592 196 L622 181 L654 194 L688 181 L720 190 L720 250 L0 250Z" fill="url(#sampleArea)"/><path d="M0 195 L35 179 L60 188 L92 162 L122 177 L154 143 L186 152 L218 98 L248 119 L277 69 L309 91 L340 134 L370 119 L404 150 L435 128 L466 163 L498 148 L528 185 L559 171 L592 196 L622 181 L654 194 L688 181 L720 190" className={styles.chartLine}/><line x1="0" x2="720" y1="190" y2="190" className={styles.currentPriceLine}/></svg><span className={styles.priceTag}>$1.24M</span><div className={styles.chartDates}><span>Sep 13</span><span>Sep 14</span><span>Sep 15</span><span>Sep 17</span><span>Sep 18</span></div></div>
  </div>
}

const liquidityLevels = [
  { marketCap: '4.0M', concentration: 32 },
  { marketCap: '3.5M', concentration: 50 },
  { marketCap: '3.0M', concentration: 73, wall: true },
  { marketCap: '2.5M', concentration: 42 },
  { marketCap: '2.0M', concentration: 92, wall: true },
  { marketCap: '1.5M', concentration: 36 },
  { marketCap: '1.0M', concentration: 53 },
  { marketCap: '850K', concentration: 61, wall: true },
  { marketCap: '500K', concentration: 26 },
  { marketCap: '250K', concentration: 15 },
]
function LiquidityDistribution() {
  return <div className={styles.liquidityChart}>
    <div className={styles.distributionLegend}><span><i className={styles.currentLegend} />Liquidity concentration</span><span><i className={styles.wallLegend} />Liquidity wall</span></div>
    <div className={styles.liquidityLadder} aria-label="Meteora liquidity walls by market cap">
      {liquidityLevels.slice(0, 6).map(({ marketCap, concentration, wall }) => <div className={`${styles.ladderRow} ${wall ? styles.ladderWall : ''}`} key={marketCap}><span className={styles.ladderLevel}>{marketCap}</span><span className={styles.ladderTrack}><i style={{ width: `${concentration}%` }} />{wall && <b>WALL</b>}</span></div>)}
      <div className={`${styles.ladderRow} ${styles.ladderCurrent}`}><span className={styles.ladderLevel}>1.24M</span><span className={styles.currentMarketCap}>◄ Current MC</span></div>
      {liquidityLevels.slice(6).map(({ marketCap, concentration, wall }) => <div className={`${styles.ladderRow} ${wall ? styles.ladderWall : ''}`} key={marketCap}><span className={styles.ladderLevel}>{marketCap}</span><span className={styles.ladderTrack}><i style={{ width: `${concentration}%` }} />{wall && <b>WALL</b>}</span></div>)}
    </div>
  </div>
}

const poolRows = [['1', '80 – 120', '$28.4K', '$124.2', '15.8%', '94'], ['2', '60 – 100', '$42.1K', '$98.4', '8.6%', '86'], ['3', '100 – 140', '$18.2K', '$76.2', '12.4%', '82'], ['4', '40 – 80', '$62.3K', '$64.1', '4.2%', '78'], ['5', '120 – 160', '$24.8K', '$48.7', '7.1%', '72']]
function PoolsPanel() {
  return <Panel title="Pools Available" action={<span className={styles.dexMark}><span aria-hidden="true">◈</span> Meteora DLMM</span>} className={styles.poolsPanel}><div className={styles.tableWrap}><table><thead><tr>{['#', 'Bin Range', 'Active TVL', 'Fee (24h)', 'APR', 'Score'].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{poolRows.map((row, index) => <tr key={row[0]} className={index === 0 ? styles.bestPool : ''}>{row.map((cell, cellIndex) => <td key={cellIndex} className={cellIndex === 4 ? styles.positive : cellIndex === 5 ? styles.score : ''}>{cell}</td>)}</tr>)}</tbody></table></div></Panel>
}

function RecommendedPool() {
  return <Panel title="Recommended Pool" detail="Meteora DLMM" action={<span className={styles.opportunity}>Best Opportunity</span>} className={styles.recommendPanel}><div className={styles.recommendStats}><Metric label="Bin ID" value="100" /><Metric label="Active TVL" value="$28.4K" /><Metric label="Fee Density (1h)" value="0.0031" /><Metric label="APR (Est.)" value="15.8%" /></div><button className={styles.primaryButton}>Use This Pool <ArrowRight size={14} /></button></Panel>
}

function FeeDensity() {
  const items = [['FD 1m', '0.0031', '+18%', 'M4 30 15 25 25 27 37 16 47 22 59 12 69 17 80 7 92 11 104 3'], ['FD 5m', '0.0028', '+12%', 'M4 30 15 24 25 26 37 17 47 20 59 13 69 18 80 9 92 12 104 4'], ['FD 15m', '0.0022', '+6%', 'M4 30 15 25 25 27 37 20 47 23 59 15 69 18 80 12 92 14 104 6']]
  return <Panel title="Fee Density" detail="Current Pool" className={styles.feePanel}><div className={styles.feeCards}>{items.map(([label, value, change, path]) => <div className={styles.feeCard} key={label}><span>{label}<b>{value}</b></span><em>{change}</em><svg viewBox="0 0 108 34" aria-hidden="true"><path d={path} /></svg></div>)}</div></Panel>
}

function Competition() {
  return <Panel title="LP Competition" className={styles.competitionPanel}><div className={styles.competitionCards}><Metric label="Active TVL" value="$28.4K" /><Metric label="Inactive TVL" value="$12.1K" /><Metric label="LP Count" value="86" /><Metric label="Competition" value="12%" /></div><div className={styles.competitionStatus}><span>Pool competition</span><b>LOW</b><i><em /></i></div></Panel>
}

function TokenOverview() {
  return <Panel title="Token Overview" className={styles.overviewPanel}><div className={styles.overviewIdentity}><span className={styles.tokenAvatarSmall}>Z</span><span><strong>Z500 / SOL</strong><small>Solana · Meme · 7xK...gQ2v</small></span><b className={styles.tag}>S Tier</b></div><div className={styles.tagList}><span>Meme</span><span>Solana Ecosystem</span><span>Community Driven</span><span>Viral Potential</span></div><div className={styles.overviewLinks}>{['Dexscreener', 'GMGN', 'Jupiter'].map((label) => <a href="#" key={label}>{label}<ExternalLink size={12} /></a>)}</div></Panel>
}

function SafetyZone() {
  const supports = [['Current MC', '$1.24M', '0%'], ['Support 1', '$850K', '−32%'], ['Support 2', '$260K', '−78%'], ['Support 3', '$120K', '−90%']]
  return <Panel title="LP Safety Zone" detail="Based on Market Cap" className={styles.safetyPanel}><div className={styles.supports}>{supports.map(([label, value, percent], index) => <div key={label} className={index === 0 ? styles.currentSupport : ''}><span>{label}</span><b>{value}</b><small className={index === 0 ? styles.positive : styles.negative}>{percent}</small></div>)}</div><div className={styles.safetyBand}><i /><i /><i /></div><div className={styles.safetyLabels}><b>High Risk</b><b>Safe Zone</b><b>High Risk</b></div><div className={styles.safetyRecommendation}><div><span>Recommended Lower Range</span><b>−30% to −35%</b></div><div className={styles.bufferMetric}><span>Safety Buffer</span><b>82%</b></div><div className={styles.safetyGauge} aria-label="82 percent safety buffer"><i /></div></div></Panel>
}

const rangeBars = [18, 27, 35, 48, 31, 43, 61, 46, 77, 52, 38, 62, 88, 56, 47, 70, 39, 32, 50, 67, 41, 28, 36, 23, 29, 19]
function LiquidityRange() {
  return <Panel title="Liquidity Distribution By Range" className={styles.rangePanel}><div className={styles.rangeChart}><div className={styles.rangeYAxis}><span>$4M</span><span>$3M</span><span>$2M</span><span>$1M</span><span>$0</span></div><div className={styles.rangeBars}>{rangeBars.map((height, index) => <i key={index} style={{ height: `${height}%` }} className={index < 10 ? styles.rangeLow : index > 17 ? styles.rangeHigh : ''} />)}<div className={styles.rangeCurrent}><b>Current MC</b><i /></div></div><div className={styles.rangeLabels}><span>$0</span><span>$1M</span><span>$2M</span><span>$3M</span><span>$4M</span></div></div><div className={styles.rangeSummary}><span>Below Current <b>32%</b></span><span>Current MC <b>$1.24M</b></span><span>Above Current <b>48%</b></span></div></Panel>
}

const wallets = [['1', '7xK...gQ2v', 'Buy', '+12.4 SOL', '2h ago'], ['2', '9sdH...hT3r', 'Buy', '+8.2 SOL', '4h ago'], ['3', '4Mkm...ellpha', 'Buy', '+5.6 SOL', '6h ago'], ['4', 'H3wR...tens', 'Sell', '−3.4 SOL', '8h ago']]
function SmartMoney() {
  return <Panel title="Smart Money Analysis" className={styles.smartPanel}><div className={styles.smartStats}><Metric label="Netflow (7d)" value="+$240K" tone="positive" /><Metric label="Buying Wallets" value="12" /><Metric label="Selling Wallets" value="4" tone="negative" /><Metric label="Whales" value="3" /></div><div className={styles.subheading}>Top Smart Wallets</div><div className={styles.tableWrap}><table><thead><tr>{['#', 'Wallet', 'Action', 'Amount', 'Time'].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{wallets.map(([rank, wallet, action, amount, time]) => <tr key={rank}><td>{rank}</td><td><span className={styles.walletDot}>{rank}</span>{wallet}</td><td><b className={action === 'Buy' ? styles.buyTag : styles.sellTag}>{action}</b></td><td className={action === 'Buy' ? styles.positive : styles.negative}>{amount}</td><td>{time}</td></tr>)}</tbody></table></div></Panel>
}

const kols = [['1', '@CryptoNico', 'Holding', '24.2 SOL', '2h ago'], ['2', '@SolHunter', 'Holding', '12.8 SOL', '4h ago'], ['3', '@Mem...ellpha', 'Buying', '8.4 SOL', '6h ago'], ['4', '@DegenLord', 'Selling', '5.2 SOL', '12h ago']]
function KolAnalysis() {
  return <Panel title="KOL Analysis" className={styles.kolPanel}><div className={styles.kolStats}><Metric label="Active KOLs" value="5" /><Metric label="Holding" value="3" tone="positive" /><Metric label="Selling" value="2" tone="negative" /></div><div className={styles.subheading}>KOL / Wallet Activity</div><div className={styles.tableWrap}><table><thead><tr>{['#', 'KOL / Wallet', 'Status', 'Amount', 'Time'].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{kols.map(([rank, kol, status, amount, time]) => <tr key={rank}><td>{rank}</td><td><span className={styles.kolAvatar}>{kol.slice(1, 2).toUpperCase()}</span>{kol}</td><td><b className={status === 'Selling' ? styles.sellTag : styles.buyTag}>{status}</b></td><td>{amount}</td><td>{time}</td></tr>)}</tbody></table></div></Panel>
}

function Narrative() {
  return <Panel title="Token Narrative & Signals" className={styles.narrativePanel}><div className={styles.tagList}><span>Meme</span><span>Solana Ecosystem</span><span>Community Driven</span><span>Viral Potential</span></div><p className={styles.narrativeText}>Community-led meme token gaining traction across Solana. Smart wallet accumulation and steady pool activity support a constructive near-term narrative.</p><div className={styles.signal}><span>Community Strength</span><b>78/100</b><i><em style={{ width: '78%' }} /></i></div><div className={styles.signal}><span>Volume Quality</span><b>82/100</b><i><em style={{ width: '82%' }} /></i></div><div className={styles.related}><b>Related Narratives</b><span>Meme <strong>+42%</strong></span><span>Solana Ecosystem <strong>+28%</strong></span><span>AI <strong>+18%</strong></span></div></Panel>
}

export default function AnalyzePoolPage() {
  const [alertSet, setAlertSet] = useState(false)
  return <div className={`trend-shell ${styles.shell}`}><Sidebar /><div className="trend-main"><Header /><main className={styles.content}>
    <TokenProfile />
    <div className={styles.mainGrid}><Panel title="Dexscreener Chart" className={styles.chartPanel}><ChartPlaceholder /></Panel><Panel title="LP Distribution" detail="Market Cap / Liquidity" className={styles.distributionPanel}><LiquidityDistribution /></Panel><div className={styles.poolStack}><PoolsPanel /><RecommendedPool /></div></div>
    <div className={styles.analysisRow}><FeeDensity /><Competition /><TokenOverview /></div>
    <div className={styles.safetyRow}><SafetyZone /><LiquidityRange /></div>
    <div className={styles.bottomGrid}><SmartMoney /><KolAnalysis /><Narrative /></div>
    <div className={styles.bottomActions}><a className={styles.secondaryAction} href="https://app.meteora.ag/" target="_blank" rel="noreferrer">Open in Meteora <ExternalLink size={14} /></a><a className={styles.secondaryAction} href="https://jup.ag/swap/SOL-Z500" target="_blank" rel="noreferrer">Swap on Jupiter <ArrowDownRight size={14} /></a><button className={styles.primaryAction} onClick={() => setAlertSet((value) => !value)}><Bell size={14} />{alertSet ? 'Alert Set' : 'Set Alert'}</button></div>
  </main></div></div>
}
