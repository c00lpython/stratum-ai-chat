'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Hash,
  Headphones,
  Mic,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Volume2,
} from 'lucide-react'
import { AppNav } from '@/components/shared/app-nav'

type Channel = { name: string; icon: typeof Hash; unread?: number }

const channels: Channel[] = [
  { name: 'general', icon: Hash },
  { name: 'agent-runs', icon: Sparkles, unread: 3 },
  { name: 'architecture', icon: Hash },
  { name: 'voice lounge', icon: Volume2 },
]

const messages = [
  { name: 'Alex Kutkovoy', initials: 'AK', role: 'Lead', time: '14:20', text: 'Synchronized the multi-agent graph with the latest spec.', color: 'violet' },
  { name: 'Olive Parker', initials: 'OP', role: 'Member', time: '14:22', text: 'Voice room connected. Audio latency is below 15ms.', color: 'cyan' },
  { name: 'Stratum AI Coach', initials: 'AI', role: 'Agent', time: '14:23', text: 'Proof-of-Work submitted for E2E validation. Awaiting Lead approval.', color: 'orange' },
]

export default function CollabScreen() {
  const [joined, setJoined] = useState(false)
  const [activeChannel, setActiveChannel] = useState('general')
  const [draft, setDraft] = useState('')
  const [showProjectMenu, setShowProjectMenu] = useState(false)

  if (!joined) {
    return (
      <main className="collab-page collab-entry">
        <AppNav active="collab" />
        <section className="collab-join-card">
          <div className="collab-join-icon"><Users size={26} /></div>
          <p className="eyebrow">COLLAB SPACE</p>
          <h1>Time to join</h1>
          <p className="collab-lede">Connect to shared real-time team spaces, collaborate with peers, and inspect live agent runs.</p>
          <div className="collab-room-preview">
            <div><span className="status-dot online" /><div><strong>Stratum Core Squad</strong><small>12 members online · Voice active</small></div><ArrowRight size={16} /></div>
            <div><span className="status-dot violet" /><div><strong>Architecture Lab</strong><small>Room STRAT-4921 · Ready to sync</small></div><ArrowRight size={16} /></div>
          </div>
          <button className="collab-primary-button" onClick={() => setJoined(true)}>Join Collab Space <ArrowRight size={16} /></button>
          <p className="collab-hint">Use an invite code or create a new workspace from the project menu.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="collab-page collab-workspace">
      <AppNav active="collab" />
      <div className="collab-layout">
        <aside className="collab-rail">
          <div className="collab-rail-head"><div className="workspace-mark">SC</div><div><strong>Stratum Core</strong><small>Team workspace</small></div><button className="collab-icon-button" aria-label="Workspace menu" onClick={() => setShowProjectMenu((value) => !value)}><ChevronDown size={15} /></button></div>
          {showProjectMenu && <div className="collab-project-menu"><button><Plus size={14} /> Create project</button><button><Users size={14} /> Join with code</button><button><Settings size={14} /> Workspace settings</button></div>}
          <div className="collab-rail-label">CHANNELS <button aria-label="Add channel"><Plus size={13} /></button></div>
          <div className="collab-channel-list">{channels.map((channel) => { const Icon = channel.icon; return <button key={channel.name} className={`collab-channel ${activeChannel === channel.name ? 'active' : ''}`} onClick={() => setActiveChannel(channel.name)}><Icon size={15} /><span>{channel.name}</span>{channel.unread && <b>{channel.unread}</b>}</button> })}</div>
          <div className="collab-rail-spacer" />
          <div className="collab-user-card"><div className="avatar avatar-violet">YO</div><div><strong>You</strong><small><span className="status-dot online" /> Online</small></div><button aria-label="Voice settings"><Settings size={14} /></button></div>
        </aside>

        <section className="collab-main">
          <header className="collab-channel-head"><div><p className="collab-channel-title"><Hash size={18} /> {activeChannel}</p><span>Share updates, coordinate agents, and keep the team in sync.</span></div><div className="collab-head-actions"><button className="collab-icon-button" aria-label="Notifications"><Bell size={17} /></button><button className="collab-icon-button" aria-label="Search messages"><Search size={17} /></button><button className="collab-member-count"><Users size={15} /> 12</button></div></header>
          <div className="collab-message-list">{messages.map((message) => <article className="collab-message" key={message.name}><div className={`avatar avatar-${message.color}`}>{message.initials}</div><div><div className="collab-message-meta"><strong>{message.name}</strong><span className={`role-chip ${message.color}`}>{message.role}</span><time>{message.time}</time></div><p>{message.text}</p><div className="collab-message-tools"><button>Reply</button><button>React</button><button>More</button></div></div></article>)}</div>
          <form className="collab-composer" onSubmit={(event) => { event.preventDefault(); setDraft('') }}><button type="button" className="collab-composer-icon" aria-label="Add attachment"><Plus size={18} /></button><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Message #${activeChannel}`} aria-label="Message channel" /><button type="button" className="collab-composer-icon" aria-label="Start voice"><Mic size={17} /></button><button className="collab-send" aria-label="Send message"><Send size={16} /></button></form>
        </section>

        <aside className="collab-members"><div className="collab-members-head"><strong>Members — 12</strong><button aria-label="Invite members"><Plus size={15} /></button></div><p className="member-group-label">ONLINE — 4</p><div className="member-list">{[['Elena Rostova','ER','Owner','orange'],['Alex Kutkovoy','AK','Lead','violet'],['Olive Parker','OP','Member','cyan'],['Stratum AI','AI','Agent','orange']].map(([name, initials, role, color]) => <div className="member-row" key={name}><div className={`avatar avatar-${color}`}>{initials}</div><div><strong>{name}</strong><small><span className="status-dot online" /> {role}</small></div>{name === 'Alex Kutkovoy' && <Volume2 className="speaking" size={14} />}</div>)}</div><p className="member-group-label">VOICE LOUNGE</p><div className="voice-room"><Headphones size={16} /><div><strong>Team voice</strong><small>Alex is speaking</small></div><Video size={15} /></div></aside>
      </div>
    </main>
  )
}
