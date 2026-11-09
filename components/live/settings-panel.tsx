'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Gauge, KeyRound, Layers3, MessageSquare, Palette, Shield, SlidersHorizontal, Wrench } from 'lucide-react'
import { AppNav } from '../shared/app-nav'

type SettingsPanelProps = { onClose: () => void }

const sections = [
  { id: 'general', label: 'General', icon: SlidersHorizontal },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: MessageSquare },
  { id: 'mcps', label: 'MCPs', icon: Layers3 },
  { id: 'skills', label: 'Skills', icon: SparkIcon },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'usage', label: 'Usage AI', icon: Gauge },
]

function SparkIcon(props: { size?: number }) { return <span {...props} aria-hidden="true">✦</span> }

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [section, setSection] = useState('general')
  const [saved, setSaved] = useState(false)
  const [accent, setAccent] = useState('lavender')
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1800) }

  return <main className="settings-screen">
    <AppNav active="settings" onSettings={() => setSection('general')} />
    <header className="settings-header"><button className="settings-back" onClick={onClose} aria-label="Back to Live"><ArrowLeft size={16} /> Live</button><div><strong>Settings</strong><span>Stratum AI workspace</span></div><div className="settings-header-actions">{saved && <span className="settings-saved"><Check size={14} /> Saved</span>}<button className="settings-close" onClick={onClose}>Done</button></div></header>
    <div className="settings-layout">
      <aside className="settings-sidebar" aria-label="Settings sections"><p className="settings-eyebrow">Workspace</p>{sections.map(({ id, label, icon: Icon }) => <button key={id} className={`settings-section ${section === id ? 'selected' : ''}`} onClick={() => setSection(id)}><Icon size={16} />{label}</button>)}<div className="settings-sidebar-gap" /><div className="settings-account"><div className="avatar avatar-user">AM</div><span>Alex Morgan</span><button className="settings-reset">Reset</button></div></aside>
      <section className="settings-content">
        {section === 'general' && <><div className="settings-title"><p>General</p><h1>Profile & workspace</h1><span>Manage your identity and workspace defaults.</span></div><div className="settings-card"><div className="settings-avatar">AM</div><div className="settings-field-grid"><label>Full name<input defaultValue="Alex Morgan" /></label><label>Username<input defaultValue="@alex_stratum" /></label><label className="wide-field">Email<input defaultValue="alex@stratum.ai" /></label></div></div></>}
        {section === 'appearance' && <><div className="settings-title"><p>Appearance</p><h1>Make it yours</h1><span>Control the look and density of Live.</span></div><div className="settings-card"><div className="settings-option-heading"><strong>Accent color</strong><span>Used for active navigation and controls.</span></div><div className="accent-options">{['lavender', 'cyan', 'orange', 'green'].map(color => <button key={color} className={`accent-dot ${color} ${accent === color ? 'active' : ''}`} onClick={() => setAccent(color)} aria-label={`${color} accent`} />)}</div></div><div className="settings-card settings-row-card"><div><strong>Compact layout</strong><span>Fit more chats on screen.</span></div><button className="settings-toggle"><span /></button></div></>}
        {section === 'notifications' && <><div className="settings-title"><p>Notifications</p><h1>Stay in the loop</h1><span>Choose when Stratum AI should get your attention.</span></div><div className="settings-card settings-row-card"><div><strong>Response ready</strong><span>Notify me when a long answer finishes.</span></div><button className="settings-toggle on"><span /></button></div><div className="settings-card settings-row-card"><div><strong>Workspace updates</strong><span>Product and collaboration updates.</span></div><button className="settings-toggle"><span /></button></div></>}
        {section === 'mcps' && <><div className="settings-title"><p>MCPs</p><h1>Connected context</h1><span>Manage servers that extend your workspace.</span></div><div className="settings-card connector-list"><div><div className="connector-icon">S</div><div><strong>Stratum Gateway</strong><span>Default workspace provider</span></div></div><span className="connector-status">Connected</span></div><div className="settings-card connector-list"><div><div className="connector-icon muted">+</div><div><strong>Add custom MCP server</strong><span>Connect a tool endpoint or local server.</span></div></div><button className="settings-outline">Add server</button></div></>}
        {section === 'skills' && <><div className="settings-title"><p>Skills</p><h1>Reusable expertise</h1><span>Choose the skills available to your chats.</span></div><div className="settings-card settings-row-card"><div><strong>Research</strong><span>Search, compare, and summarize sources.</span></div><button className="settings-toggle on"><span /></button></div><div className="settings-card settings-row-card"><div><strong>Writing partner</strong><span>Rewrite and refine your drafts.</span></div><button className="settings-toggle on"><span /></button></div></>}
        {section === 'tools' && <><div className="settings-title"><p>Tools</p><h1>Available actions</h1><span>Control what Live can use in a conversation.</span></div><div className="settings-card settings-row-card"><div><strong>Web search</strong><span>Bring current information into answers.</span></div><button className="settings-toggle on"><span /></button></div><div className="settings-card settings-row-card"><div><strong>Code interpreter</strong><span>Run calculations and inspect files.</span></div><button className="settings-toggle"><span /></button></div></>}
        {section === 'usage' && <><div className="settings-title"><p>Usage AI</p><h1>Usage & access</h1><span>Review model, API, and MCP activity in one place.</span></div><div className="usage-grid"><div className="usage-stat"><strong>68%</strong><span>AI credits used</span></div><div className="usage-stat"><strong>24</strong><span>API calls this month</span></div><div className="usage-stat"><strong>9</strong><span>MCP calls this week</span></div></div><div className="settings-card settings-row-card"><div><strong>API keys</strong><span>Create and revoke keys for external clients.</span></div><button className="settings-outline"><KeyRound size={14} /> Manage</button></div></>}
        <button className="settings-save" onClick={save}>{saved ? 'Saved' : 'Save changes'}</button>
      </section>
    </div>
  </main>
}
