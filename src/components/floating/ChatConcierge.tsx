'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { EASE_OUT } from '@/lib/utils/motion'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
}

const QUICK_REPLIES = [
  'Tonight\'s specials',
  'Make a reservation',
  'Vegetarian options',
  'Private events',
]

const BOT_RESPONSES: Record<string, string> = {
  'tonight\'s specials':
    'Tonight we\'re featuring Ember Scallops, Truffle Risotto, and a 45-day dry-aged ribeye. Would you like me to send you the full menu?',
  'make a reservation':
    'Wonderful. I can help with that. Head to our Reservations page — you can book in under 60 seconds. Or I can answer any questions about seating.',
  'vegetarian options':
    'We have a full vegetarian tasting menu with 7 courses. Chef Dubois designs it fresh each morning based on what arrives from our farms.',
  'private events':
    'Our private room seats up to 16. Perfect for celebrations or business dinners. I can connect you with our events team — just share your email.',
}

export function ChatConcierge() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Hello — I\'m Camille, your Maison Noir concierge. How can I help tonight?',
    },
  ])
  const [input, setInput] = useState('')

  const sendMessage = (text: string) => {
    const userMsg: Message = {
      id: Math.random().toString(36).slice(2),
      role: 'user',
      text,
    }
    setMessages((m) => [...m, userMsg])
    setInput('')

    // Fake bot reply
    setTimeout(() => {
      const key = text.toLowerCase().trim()
      const reply =
        BOT_RESPONSES[key] ||
        'Thank you — let me look into that. In the meantime, feel free to browse our menu or reserve a table. I\'ll follow up shortly.'
      setMessages((m) => [
        ...m,
        { id: Math.random().toString(36).slice(2), role: 'bot', text: reply },
      ])
    }, 600)
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: EASE_OUT }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-gold text-bg-primary shadow-glow-gold flex items-center justify-center hover:shadow-glow-gold-lg transition-shadow duration-500"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="fixed bottom-24 left-6 z-40 w-[360px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-10rem)] glass-strong rounded-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-border">
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-1">
                Concierge
              </p>
              <p className="font-display text-xl text-bone">Camille</p>
              <p className="text-xs font-medium text-muted mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                Online now
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${
                      m.role === 'user'
                        ? 'bg-gold text-bg-primary'
                        : 'bg-bg-secondary text-bone'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-pill border border-border text-bone hover:border-gold/40 hover:text-gold transition-colors duration-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (input.trim()) sendMessage(input.trim())
              }}
              className="p-3 border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 h-10 px-3 rounded-md bg-bg-secondary/60 border border-border text-sm text-bone placeholder:text-muted focus:outline-none focus:border-gold/60"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="h-10 w-10 rounded-md bg-gold text-bg-primary flex items-center justify-center disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
