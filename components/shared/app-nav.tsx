'use client'

import { Home, Menu, Search, Settings2, UserRound } from 'lucide-react'

type AppNavProps = {
  active?: 'live' | 'settings'
  onSettings?: () => void
  onMenu?: () => void
}

export function AppNav({ active = 'live', onSettings, onMenu }: AppNavProps) {
  return (
    <header className="conversation-header app-nav">
      <button className="icon-button menu-button" aria-label="Open sidebar" onClick={onMenu}>
        <Menu size={19} />
      </button>
      <div className="live-brand">Stratum <span>AI</span></div>
      <nav className="live-nav" aria-label="Primary navigation">
        <a href="#home"><Home size={14} /> Home</a>
        <a href="#project">ProjectName</a>
        <a href="#live" className={active === 'live' ? 'live-nav-active' : ''} aria-current={active === 'live' ? 'page' : undefined}>Live</a>
        <a href="#collab">Collab</a>
      </nav>
      <div className="live-header-actions">
        <label className="live-search"><Search size={14} /><input aria-label="Search" placeholder="Search" /><kbd>⌘ K</kbd></label>
        <button className="icon-button" aria-label="Account"><UserRound size={17} /></button>
        <button className={`icon-button ${active === 'settings' ? 'header-icon-active' : ''}`} aria-label="Settings" onClick={onSettings}>
          <Settings2 size={17} />
        </button>
      </div>
    </header>
  )
}
