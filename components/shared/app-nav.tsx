'use client'

import { Home, Search, Settings2, UserRound } from 'lucide-react'

type AppNavProps = { active?: 'live' | 'settings'; onSettings?: () => void }

export function AppNav({ active = 'live', onSettings }: AppNavProps) {
  return <header className="conversation-header app-nav">
    <div className="live-brand">Stratum <span>AI</span></div>
    <nav className="live-nav" aria-label="Primary navigation">
      <a href="#home"><Home size={14} /> Home</a>
      <a href="#project">ProjectName</a>
      <a href="#live" className={active === 'live' ? 'live-nav-active' : ''} aria-current={active === 'live' ? 'page' : undefined}>Live</a>
      <a href="#collab">Collab</a>
    </nav>
    <div className="header-actions">
      <label className="header-search"><Search size={14} /><input aria-label="Search" placeholder="Search" /></label>
      <button className="header-icon" aria-label="Account"><UserRound size={16} /></button>
      <button className={`header-icon ${active === 'settings' ? 'header-icon-active' : ''}`} aria-label="Settings" onClick={onSettings}><Settings2 size={16} /></button>
    </div>
  </header>
}
