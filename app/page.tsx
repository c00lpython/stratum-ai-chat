'use client'

import { useEffect, useState } from 'react'
import { Archive, ArrowUp, Bot, Check, ChevronDown, Command, Copy, FileText, GitBranch, Home, Menu, Mic, MoreHorizontal, Paperclip, Pencil, Pin, Plus, RotateCcw, Search, Settings2, Sparkles, Trash2, User, UserRound } from 'lucide-react'

type Message = { id: number; role: 'user' | 'assistant'; content: string; edited?: boolean; branch?: number }
type Chat = { id: number; title: string; time: string; pinned?: boolean }

const seedMessages: Message[] = [
  { id: 1, role: 'user', content: 'Can you help me plan a more intentional morning routine?' },
  { id: 2, role: 'assistant', content: "Absolutely. Let's make it feel spacious, not strict. What do you want your mornings to make room for?" },
]
const seedChats: Chat[] = [
  { id: 1, title: 'A more intentional morning', time: 'Just now', pinned: true },
  { id: 2, title: 'Ideas for my next project', time: 'Yesterday' },
  { id: 3, title: 'Notes on creative focus', time: 'Mon' },
  { id: 4, title: 'Weekend in Copenhagen', time: 'May 18' },
]

export default function Page() {
  const [messages, setMessages] = useState(seedMessages)
  const [chats, setChats] = useState(seedChats)
  const [draft, setDraft] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')
  const [openChatMenu, setOpenChatMenu] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [typingId, setTypingId] = useState<number | null>(null)
  const [typingTarget, setTypingTarget] = useState('')

  useEffect(() => {
    if (typingId === null || !typingTarget) return
  let index = 0
  let timer: number | undefined
  const startTyping = window.setTimeout(() => {
    timer = window.setInterval(() => {
      index += 1
      setMessages((current) => current.map((message) => message.id === typingId ? { ...message, content: typingTarget.slice(0, index) } : message))
      if (index >= typingTarget.length) {
        window.clearInterval(timer)
        setTypingId(null)
        setIsGenerating(false)
      }
    }, 22)
  }, 850)
  return () => {
    window.clearTimeout(startTyping)
    if (timer !== undefined) window.clearInterval(timer)
  }
  }, [typingId, typingTarget])

  const toggleVoiceInput = () => {
    const browserWindow = window as typeof window & { SpeechRecognition?: any; webkitSpeechRecognition?: any }
    const Recognition = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition
    if (!Recognition) return
    if (isListening) { setIsListening(false); return }
    const recognition = new Recognition()
    recognition.continuous = false; recognition.interimResults = false; recognition.lang = 'en-US'
    recognition.onresult = (event: any) => { setDraft((current) => `${current}${current ? ' ' : ''}${event.results[0][0].transcript}`); setIsListening(false) }
    recognition.onerror = () => setIsListening(false); recognition.onend = () => setIsListening(false); recognition.start(); setIsListening(true)
  }

  const sendMessage = () => {
    const trimmed = draft.trim(); if (!trimmed || isGenerating) return
    const now = Date.now()
    const reply = 'That sounds like a meaningful direction. I\'d start with one small anchor, protect a little quiet, and let the rest of the morning stay flexible.'
    setMessages((current) => [...current, { id: now, role: 'user', content: trimmed }, { id: now + 1, role: 'assistant', content: '' }])
    setDraft(''); setIsGenerating(true); setTypingTarget(reply); setTypingId(now + 1)
  }
  const copyMessage = (id: number, content: string) => { navigator.clipboard?.writeText(content); setCopied(id); window.setTimeout(() => setCopied(null), 1600) }
  const regenerate = (id: number) => {
    const reply = "Here's another angle: begin with one gentle anchor, then leave enough space for the day to unfold naturally."
    setMessages((current) => current.map((message) => message.id === id ? { ...message, content: '', branch: (message.branch || 1) + 1 } : message))
    setIsGenerating(true)
    setTypingTarget(reply)
    setTypingId(id)
  }
  const startEdit = (message: Message) => { setEditingId(message.id); setEditingText(message.content) }
  const saveEdit = (id: number) => { setMessages((current) => current.map((message) => message.id === id ? { ...message, content: editingText, edited: true } : message)); setEditingId(null) }
  const togglePin = (id: number) => setChats((current) => current.map((chat) => chat.id === id ? { ...chat, pinned: !chat.pinned } : chat))
  const renameChat = (id: number) => { const chat = chats.find((item) => item.id === id); const title = window.prompt('Rename chat', chat?.title); if (title?.trim()) setChats((current) => current.map((item) => item.id === id ? { ...item, title: title.trim() } : item)); setOpenChatMenu(null) }
  const deleteChat = (id: number) => { setChats((current) => current.filter((chat) => chat.id !== id)); setOpenChatMenu(null) }

  const renderChat = (chat: Chat) => (
    <div className={`chat-item-wrap ${chat.pinned ? 'chat-item-pinned' : ''}`} key={chat.id}>
      <button className="chat-item" onClick={() => { setMessages(seedMessages); setSidebarOpen(false) }}>
        <span className="chat-item-icon">{chat.pinned ? <Pin size={13} /> : <FileText size={14} />}</span>
        <span className="chat-item-copy"><span>{chat.title}</span><small>{chat.time}</small></span>
        {chat.pinned && <span className="pinned-label">Pinned</span>}
      </button>
      <button className="chat-menu-trigger" aria-label={`Chat actions for ${chat.title}`} onClick={() => setOpenChatMenu(openChatMenu === chat.id ? null : chat.id)}><MoreHorizontal size={14} /></button>
      {openChatMenu === chat.id && <div className="chat-dropdown"><button onClick={() => togglePin(chat.id)}><Pin size={13} /> {chat.pinned ? 'Unpin chat' : 'Pin chat'}</button><button onClick={() => renameChat(chat.id)}><Pencil size={13} /> Rename chat</button><button className="danger-action" onClick={() => deleteChat(chat.id)}><Trash2 size={13} /> Delete chat</button></div>}
    </div>
  )

  return (
    <main className="app-shell app-enter">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top"><div className="brand-mark"><Sparkles size={16} strokeWidth={2.5} /></div><span className="brand-name">Lume</span><button className="icon-button sidebar-close" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}>×</button></div>
        <button className="new-chat" onClick={() => { setMessages([]); setSidebarOpen(false) }}><Plus size={16} /><span>New chat</span><span className="new-chat-shortcut">⌘ K</span></button>
        <div className="search-box"><Search size={15} /><input aria-label="Search chats" placeholder="Search chats" /><span className="search-key">⌘</span></div>
        <nav className="chat-list" aria-label="Chats"><p className="section-label">Pinned chats</p>{chats.filter((chat) => chat.pinned).map(renderChat)}<p className="section-label all-chats-label">All chats</p>{chats.filter((chat) => !chat.pinned).map(renderChat)}</nav>
        <div className="sidebar-bottom"><button className="sidebar-link"><Archive size={15} /> Archive</button><button className="sidebar-link"><Settings2 size={15} /> Settings</button><div className="profile-card"><div className="avatar avatar-user">AM</div><div><strong>Alex Morgan</strong><span>Personal workspace</span></div><MoreHorizontal size={16} className="profile-more" /></div></div>
      </aside>

      <section className="conversation">
        <header className="conversation-header"><button className="icon-button menu-button" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}><Menu size={19} /></button><div className="live-brand">Stratum <span>AI</span></div><nav className="live-nav" aria-label="Primary navigation"><a href="#home"><Home size={14} /> Home</a><a href="#project">ProjectName</a><a href="#live" className="live-nav-active" aria-current="page">Live</a><a href="#collab">Collab</a></nav><div className="live-header-actions"><label className="live-search"><Search size={14} /><input aria-label="Search" placeholder="Search" /><kbd>⌘ K</kbd></label><button className="icon-button" aria-label="Account"><UserRound size={17} /></button><button className="icon-button" aria-label="Settings"><Settings2 size={17} /></button></div></header>
        <div className="message-area">{messages.length === 0 ? <div className="empty-state"><div className="empty-mark"><Sparkles size={23} /></div><h1>Start a new thought</h1><p>Bring a question, an idea, or simply a moment of curiosity.</p></div> : <div className="messages"><div className="day-marker"><span>Today</span></div>{messages.map((message) => <article className={`message-row ${message.role}`} key={message.id}><div className={`avatar ${message.role === 'assistant' ? 'avatar-ai' : 'avatar-user'}`}>{message.role === 'assistant' ? <Sparkles size={15} /> : <User size={15} />}</div><div className="message-content"><div className="message-meta"><strong>{message.role === 'assistant' ? 'Lume' : 'You'}</strong><span>{message.role === 'assistant' ? 'thoughtful assistant' : message.edited ? 'edited' : 'now'}</span></div>{editingId === message.id ? <div className="edit-message"><textarea value={editingText} onChange={(event) => setEditingText(event.target.value)} autoFocus /><div><button onClick={() => setEditingId(null)}>Cancel</button><button className="edit-save" onClick={() => saveEdit(message.id)}>Save edit</button></div></div> : message.content ? <p>{message.content}</p> : isGenerating && message.role === 'assistant' ? <div className="typing-indicator" aria-label="Lume is thinking"><span /><span /><span /></div> : null}{message.role === 'user' && editingId !== message.id && <div className="message-tools"><button onClick={() => startEdit(message)}><Pencil size={13} /> Edit</button><button onClick={() => startEdit(message)}><GitBranch size={13} /> Branch</button></div>}{message.role === 'assistant' && <div className="message-tools"><button onClick={() => copyMessage(message.id, message.content)}>{copied === message.id ? <Check size={13} /> : <Copy size={13} />} {copied === message.id ? 'Copied' : 'Copy'}</button><button onClick={() => regenerate(message.id)}><RotateCcw size={13} /> Regenerate</button><button onClick={() => setMessages((current) => [...current, { id: Date.now(), role: 'assistant', content: 'I can rephrase that with a clearer, more polished tone whenever you want.' }])}><Sparkles size={13} /> Polish</button><button aria-label="More message actions"><MoreHorizontal size={14} /></button></div>}</div></article>)}</div>}</div>
        <div className="composer-wrap"><div className="composer"><textarea aria-label="Message Lume" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); sendMessage() } }} placeholder="Continue the conversation..." rows={1} /><div className="composer-footer"><div className="composer-left"><button className="composer-icon" aria-label="Attach file"><Paperclip size={17} /></button><button className="model-button"><Bot size={15} /> Lume <ChevronDown size={13} /></button></div><div className="composer-right"><span className="composer-hint"><Command size={12} /> Enter to send</span><button className={`voice-button ${isListening ? 'voice-button-active' : ''}`} aria-label={isListening ? 'Stop voice input' : 'Start voice input'} aria-pressed={isListening} onClick={toggleVoiceInput}><Mic size={16} /></button><button className="send-button" aria-label="Send message" onClick={sendMessage}><ArrowUp size={17} /></button></div></div></div><p className="composer-note">Lume can make mistakes. Check important information.</p></div>
      </section>
    </main>
  )
}
