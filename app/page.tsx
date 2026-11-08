'use client'

import { useState } from 'react'
import {
  Archive,
  ArrowUp,
  Bot,
  Check,
  ChevronDown,
  Command,
  Copy,
  FileText,
  Home,
  Menu,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Settings2,
  Sparkles,
  UserRound,
  SquarePen,
  User,
} from 'lucide-react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

type Chat = { title: string; time: string; active?: boolean }

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'user',
    content: 'Can you help me plan a more intentional morning routine?',
  },
  {
    id: 2,
    role: 'assistant',
    content:
      'Absolutely. Let\'s make it feel spacious, not strict. What do you want your mornings to make room for?',
  },
]

const chats: Chat[] = [
  { title: 'A more intentional morning', time: 'Just now', active: true },
  { title: 'Ideas for my next project', time: 'Yesterday' },
  { title: 'Notes on creative focus', time: 'Mon' },
  { title: 'Weekend in Copenhagen', time: 'May 18' },
]

export default function Page() {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)

  const sendMessage = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', content: trimmed },
      {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          'That sounds like a meaningful direction. I\'d start with one small anchor, protect a little quiet, and let the rest of the morning stay flexible.',
      },
    ])
    setDraft('')
  }

  const copyMessage = (id: number, content: string) => {
    navigator.clipboard?.writeText(content)
    setCopied(id)
    window.setTimeout(() => setCopied(null), 1600)
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <div className="brand-mark"><Sparkles size={16} strokeWidth={2.5} /></div>
          <span className="brand-name">Lume</span>
          <button className="icon-button sidebar-close" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}>×</button>
        </div>

        <button className="new-chat" onClick={() => setMessages([])}>
          <Plus size={16} />
          <span>New conversation</span>
          <span className="new-chat-shortcut">⌘ K</span>
        </button>

        <div className="search-box">
          <Search size={15} />
          <input aria-label="Search conversations" placeholder="Search conversations" />
          <span className="search-key">⌘</span>
        </div>

        <nav className="chat-list" aria-label="Conversations">
          <p className="section-label">Your conversations</p>
          {chats.map((chat) => (
            <button key={chat.title} className={`chat-item ${chat.active ? 'chat-item-active' : ''}`} onClick={() => setMessages(initialMessages)}>
              <span className="chat-item-icon"><FileText size={14} /></span>
              <span className="chat-item-copy"><span>{chat.title}</span><small>{chat.time}</small></span>
              {chat.active && <span className="active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-link"><Archive size={15} /> Archive</button>
          <button className="sidebar-link"><Settings2 size={15} /> Settings</button>
          <div className="profile-card">
            <div className="avatar avatar-user">AM</div>
            <div><strong>Alex Morgan</strong><span>Personal workspace</span></div>
            <MoreHorizontal size={16} className="profile-more" />
          </div>
        </div>
      </aside>

      <section className="conversation">
        <header className="conversation-header">
          <button className="icon-button menu-button" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}><Menu size={19} /></button>
          <div className="live-brand">Stratum <span>AI</span></div>
          <nav className="live-nav" aria-label="Primary navigation">
            <a href="#home"><Home size={14} /> Home</a>
            <a href="#project">ProjectName</a>
            <a href="#live" className="live-nav-active" aria-current="page">Live</a>
            <a href="#collab">Collab</a>
          </nav>
          <div className="live-header-actions">
            <label className="live-search">
              <Search size={14} />
              <input aria-label="Search" placeholder="Search" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button" aria-label="Account"><UserRound size={17} /></button>
            <button className="icon-button" aria-label="Settings"><Settings2 size={17} /></button>
          </div>
        </header>

        <div className="message-area">
          {messages.length === 0 ? (
            <div className="empty-state"><div className="empty-mark"><Sparkles size={23} /></div><h1>Start a new thought</h1><p>Bring a question, an idea, or simply a moment of curiosity.</p></div>
          ) : (
            <div className="messages">
              <div className="day-marker"><span>Today</span></div>
              {messages.map((message) => (
                <article className={`message-row ${message.role}`} key={message.id}>
                  <div className={`avatar ${message.role === 'assistant' ? 'avatar-ai' : 'avatar-user'}`}>{message.role === 'assistant' ? <Sparkles size={15} /> : <User size={15} />}</div>
                  <div className="message-content">
                    <div className="message-meta"><strong>{message.role === 'assistant' ? 'Lume' : 'You'}</strong><span>{message.role === 'assistant' ? 'thoughtful assistant' : 'now'}</span></div>
                    <p>{message.content}</p>
                    {message.role === 'assistant' && <div className="message-tools"><button onClick={() => copyMessage(message.id, message.content)}>{copied === message.id ? <Check size={13} /> : <Copy size={13} />} {copied === message.id ? 'Copied' : 'Copy'}</button><button aria-label="More message actions"><MoreHorizontal size={14} /></button></div>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="composer-wrap">
          <div className="composer">
            <textarea aria-label="Message Lume" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); sendMessage() } }} placeholder="Continue the conversation..." rows={1} />
            <div className="composer-footer"><div className="composer-left"><button className="composer-icon" aria-label="Attach file"><Paperclip size={17} /></button><button className="model-button"><Bot size={15} /> Lume <ChevronDown size={13} /></button></div><div className="composer-right"><span className="composer-hint"><Command size={12} /> Enter to send</span><button className="send-button" aria-label="Send message" onClick={sendMessage}><ArrowUp size={17} /></button></div></div>
          </div>
          <p className="composer-note">Lume can make mistakes. Check important information.</p>
        </div>
      </section>
    </main>
  )
}
