"use client"

import { useState } from "react"
import { ArrowLeft, Check, Eye, KeyRound, Mic, Palette, Server, UserRound } from "lucide-react"

type SettingsPanelProps = { onClose: () => void }

const sections = [
  { id: "general", label: "General", icon: UserRound },
  { id: "ai", label: "AI & MCP", icon: Server },
  { id: "voice", label: "Voice & Audio", icon: Mic },
  { id: "appearance", label: "Appearance", icon: Palette },
]

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [section, setSection] = useState("general")
  const [saved, setSaved] = useState(false)
  const [accent, setAccent] = useState("lavender")
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1800) }

  return (
    <main className="settings-screen">
      <header className="settings-header">
        <button className="settings-back" onClick={onClose} aria-label="Back to Live"><ArrowLeft size={16} /> Live</button>
        <div><strong>Settings</strong><span>Stratum AI workspace</span></div>
        <div className="settings-header-actions">{saved && <span className="settings-saved"><Check size={14} /> Saved</span>}<button className="settings-close" onClick={onClose}>Done</button></div>
      </header>
      <div className="settings-layout">
        <aside className="settings-sidebar" aria-label="Settings sections">
          <p className="settings-eyebrow">Workspace</p>
          {sections.map(({ id, label, icon: Icon }) => <button key={id} className={`settings-section ${section === id ? "selected" : ""}`} onClick={() => setSection(id)}><Icon size={16} />{label}</button>)}
          <p className="settings-eyebrow settings-eyebrow-lower">Security</p>
          <button className="settings-section"><KeyRound size={16} />API keys</button>
        </aside>
        <section className="settings-content">
          {section === "general" && <><div className="settings-title"><p>General</p><h1>Profile & workspace</h1><span>Manage how Stratum AI looks and behaves for you.</span></div><div className="settings-card"><div className="settings-avatar">AM</div><div className="settings-field-grid"><label>Full name<input defaultValue="Alex Morgan" /></label><label>Username<input defaultValue="@alex_stratum" /></label><label className="wide-field">Email<input defaultValue="alex@stratum.ai" /></label></div></div><div className="settings-card settings-row-card"><div><strong>Notifications</strong><span>Get notified when a response is ready.</span></div><button className="settings-toggle on" aria-label="Notifications enabled"><span /></button></div></>}
          {section === "ai" && <><div className="settings-title"><p>AI & MCP</p><h1>Connectors</h1><span>Choose models and tools available in Live.</span></div><div className="settings-card connector-list"><div><div className="connector-icon">S</div><div><strong>Stratum Gateway</strong><span>Default workspace provider</span></div></div><span className="connector-status">Connected</span></div><div className="settings-card connector-list"><div><div className="connector-icon muted">+</div><div><strong>Add custom MCP server</strong><span>Connect a tool endpoint or local server</span></div></div><button className="settings-outline">Add server</button></div></>}
          {section === "voice" && <><div className="settings-title"><p>Voice & Audio</p><h1>Voice input</h1><span>Configure how voice messages are captured and played back.</span></div><div className="settings-card settings-row-card"><div><strong>Voice input</strong><span>Use your microphone in the composer.</span></div><button className="settings-toggle on"><span /></button></div><div className="settings-card settings-row-card"><div><strong>Playback voice</strong><span>Read AI answers aloud when ready.</span></div><button className="settings-toggle"><span /></button></div></>}
          {section === "appearance" && <><div className="settings-title"><p>Appearance</p><h1>Make it yours</h1><span>Personalize the Live workspace.</span></div><div className="settings-card"><div className="settings-option-heading"><strong>Accent color</strong><span>Used for active navigation and controls.</span></div><div className="accent-options">{["lavender", "cyan", "orange", "green"].map(color => <button key={color} className={`accent-dot ${color} ${accent === color ? "active" : ""}`} onClick={() => setAccent(color)} aria-label={`${color} accent`} />)}</div></div><div className="settings-card settings-row-card"><div><strong>Compact layout</strong><span>Fit more conversations on screen.</span></div><button className="settings-toggle"><span /></button></div></>}
          <button className="settings-save" onClick={save}>Save changes</button>
        </section>
      </div>
    </main>
  )
}
