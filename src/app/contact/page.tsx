'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import './page.css'

type FormState = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [state, setState] = useState<FormState>('idle')
  const [err, setErr] = useState<string>('')

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErr('')
    setState('sending')

    const fd = new FormData(e.currentTarget)
    // Honeypot (bots will fill it)
    if ((fd.get('company') as string)?.trim()) {
      setState('ok') // silently accept
      e.currentTarget.reset()
      return
    }

    const payload = {
      name: (fd.get('name') as string)?.trim(),
      email: (fd.get('email') as string)?.trim(),
      subject: (fd.get('subject') as string)?.trim(),
      message: (fd.get('message') as string)?.trim(),
      budget: (fd.get('budget') as string) || '',
    }

    // Basic front-end validation
    if (!payload.name || !payload.email || !payload.message) {
      setErr('Please fill in your name, email, and message.')
      setState('idle')
      return
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
    if (!emailOk) {
      setErr('Please use a valid email address.')
      setState('idle')
      return
    }

    // Try POST /api/contact (optional backend). If missing, fallback to mailto:
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('non-200')
      setState('ok')
      e.currentTarget.reset()
      return
    } catch {
      // Fallback to mail client
      const mailto = buildMailto(payload)
      window.location.href = mailto
      setState('ok')
      e.currentTarget.reset()
    }
  }, [])

  const disabled = useMemo(() => state === 'sending', [state])

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="contact-head">
        <h1 className="title">Contact</h1>
        <p className="subtitle muted">
          Tell me a bit about your project—timeline, goals, success criteria.
        </p>
      </header>

      <section className="contact-grid">
        {/* FORM */}
        <form
          ref={formRef}
          className="panel form"
          onSubmit={onSubmit}
          noValidate
        >
          {/* Honeypot (hidden) */}
          <input
            type="text"
            name="company"
            className="hp"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="row">
            <div className="field">
              <label htmlFor="name">
                Name
                <span aria-hidden="true" className="req">
                  *
                </span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">
                Email
                <span aria-hidden="true" className="req">
                  *
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project / question"
              />
            </div>
            <div className="field">
              <label htmlFor="budget">Budget</label>
              <select id="budget" name="budget" defaultValue="">
                <option value="" disabled>
                  Choose a range (optional)
                </option>
                <option value="under-1k">Under $1k</option>
                <option value="1k-5k">$1k–$5k</option>
                <option value="5k-15k">$5k–$15k</option>
                <option value="15k-plus">$15k+</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">
              Message
              <span aria-hidden="true" className="req">
                *
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="What are we building? Goals, timeline, links…"
            ></textarea>
          </div>

          {err && (
            <p className="error" role="alert">
              {err}
            </p>
          )}

          <div className="actions">
            <button className="btn primary" type="submit" disabled={disabled}>
              {state === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <a className="btn ghost" href="mailto:hello@example.com">
              Email directly
            </a>
          </div>

          {state === 'ok' && (
            <p className="success" role="status">
              Thank you! I’ll get back to you shortly.
            </p>
          )}
          {state === 'error' && (
            <p className="error" role="alert">
              Something went wrong. Please email me directly.
            </p>
          )}
        </form>

        {/* SIDEBAR */}
        <aside className="panel info" aria-label="Direct contact">
          <h2 className="h2">Direct</h2>
          <ul className="list">
            <li>
              <span>Location</span>
              <strong>Thailand • GMT+7</strong>
            </li>
            <li>
              <span>Email</span>
              <a href="mailto:poomtawee@outlook.com">poomtawee@outlook.com</a>
            </li>
            <li>
              <span>GitHub</span>
              <a
                href="https://github.com/P-mm02"
                target="_blank"
                rel="noreferrer"
              >
                github.com/P-mm02
              </a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noreferrer"
              >
                /in/your-linkedin
              </a>
            </li>
          </ul>

          <h2 className="h2">Working style</h2>
          <ul className="bullets">
            <li>Small, clear iterations</li>
            <li>Typed models and predictable APIs</li>
            <li>Readable UI with dark-first tokens</li>
          </ul>
        </aside>
      </section>
    </div>
  )
}

function buildMailto(p: {
  name: string
  email: string
  subject?: string
  message: string
  budget?: string
}) {
  const to = 'hello@example.com' // TODO: set your real email
  const subject = encodeURIComponent(p.subject || `New inquiry from ${p.name}`)
  const body = encodeURIComponent(
    `Name: ${p.name}
Email: ${p.email}
Budget: ${p.budget || '-'}
---
${p.message}`
  )
  return `mailto:${to}?subject=${subject}&body=${body}`
}
