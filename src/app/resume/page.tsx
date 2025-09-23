'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import './page.css'

export default function ResumePage() {
  const year = useMemo(() => new Date().getFullYear(), [])

  // TODO: replace with your real info/links
  const CONTACT = {
    email: 'hello@example.com',
    phone: '+66 00 000 0000',
    location: 'Thailand • GMT+7',
    website: 'https://your-domain.com',
    github: 'https://github.com/your-github',
    linkedin: 'https://www.linkedin.com/in/your-linkedin',
    pdf: '/resume.pdf', // optional static PDF in /public
  }

  const SKILLS = {
    frontend: [
      'Next.js',
      'React',
      'TypeScript',
      'CSS Architecture',
      'Accessibility',
    ],
    backend: ['Node.js', 'MongoDB/Mongoose', 'REST APIs', 'Auth & Security'],
    tooling: [
      'Netlify/CI',
      'Git/GitHub',
      'i18n/SEO',
      'Analytics',
      'Automations',
    ],
  }

  const EXPERIENCE: Array<{
    role: string
    company: string
    period: string
    summary: string
    bullets: string[]
    tech?: string[]
  }> = [
    {
      role: 'Freelance Software Engineer',
      company: 'Independent',
      period: '2024 – Present',
      summary:
        'Design and ship production-grade web apps with pragmatic architecture and dark-first UI tokens.',
      bullets: [
        'Scoped, built, and deployed multiple client projects with App Router best practices.',
        'Shipped clean schemas, predictable APIs, and readable UIs with strong a11y defaults.',
        'Set up CI, preview deploys, and lightweight analytics for continuous feedback.',
      ],
      tech: ['Next.js', 'TypeScript', 'MongoDB', 'Netlify'],
    },
    {
      role: 'Lead Developer • SGW Project Manager',
      company: 'Siam Groundwater (internal)',
      period: '2024 – 2025',
      summary:
        'Operational planning platform for members, projects, licenses, notifications, and reporting.',
      bullets: [
        'Gantt-style schedule views, members roster, and license expiry notifications (email/LINE).',
        'Structured data model with Mongoose; robust API validation and editor UX.',
        'Improved operational transparency and reduced manual follow-ups.',
      ],
      tech: ['Next.js', 'TypeScript', 'MongoDB', 'LINE Notify'],
    },
    {
      role: 'Full-stack Developer • Caroline Clinic',
      company: 'Client project',
      period: '2023 – 2024',
      summary:
        'Multilingual clinic website with clean IA, SEO-ready content model, and admin tooling.',
      bullets: [
        'EN/TH content routing, structured metadata, and OG images for social share.',
        'Admin-friendly components for service categories, media, and team profiles.',
      ],
      tech: ['Next.js', 'i18n', 'SEO'],
    },
  ]

  const EDUCATION = [
    { title: 'B.Sc. Computer Science & Physics', org: '—', year: '—' },
  ]

  const LANGS = [
    { name: 'Thai', level: 'Native' },
    { name: 'English', level: 'Professional' },
  ]

  const CERTS = [{ title: '—', org: '', year: '' }]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wee',
    jobTitle: 'Software Engineer',
    url: CONTACT.website,
    email: CONTACT.email,
    sameAs: [CONTACT.github, CONTACT.linkedin].filter(Boolean),
    worksFor: { '@type': 'Organization', name: 'Independent' },
    address: { '@type': 'PostalAddress', addressCountry: 'TH' },
  }

  return (
    <div className="resume">
      {/* SEO: Person schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Action bar (hidden in print) */}
      <div className="resume-actions print-hide">
        {CONTACT.pdf && (
          <a
            className="btn ghost"
            href={CONTACT.pdf}
            target="_blank"
            rel="noreferrer"
          >
            Download PDF
          </a>
        )}
        <button className="btn primary" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      {/* Header */}
      <header className="resume-header">
        <div className="identity">
          <h1 className="name">Wee</h1>
          <p className="title">Software Engineer • Full-stack</p>
        </div>
        <ul className="contacts">
          <li>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>{CONTACT.phone}</li>
          <li>{CONTACT.location}</li>
          <li>
            <a href={CONTACT.website} target="_blank" rel="noreferrer">
              {CONTACT.website.replace(/^https?:\/\//, '')}
            </a>
          </li>
          <li>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </header>

      {/* Summary */}
      <section className="summary">
        <h2 className="h2">Summary</h2>
        <p className="lead">
          Pragmatic developer focused on shipping maintainable web apps: clean
          schemas, predictable APIs, and readable UIs. Comfortable
          end-to-end—from scoping and data modeling to deployment and analytics.
        </p>
      </section>

      {/* 2-column body */}
      <section className="body">
        {/* Left column */}
        <div className="col">
          <section className="block">
            <h2 className="h2">Experience</h2>
            <ul className="timeline">
              {EXPERIENCE.map((e) => (
                <li key={e.role + e.period} className="item">
                  <div className="when">{e.period}</div>
                  <div className="what">
                    <h3 className="role">{e.role}</h3>
                    <div className="org">{e.company}</div>
                    <p className="desc">{e.summary}</p>
                    <ul className="bullets">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {e.tech?.length ? (
                      <ul className="tags" aria-label="Tech">
                        {e.tech.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="block">
            <h2 className="h2">Selected Projects</h2>
            <ul className="projects">
              <li>
                <strong>SGW Project Manager</strong> — Ops planning platform (
                <Link href="/projects/sgw-project-manager">case study</Link>)
              </li>
              <li>
                <strong>Caroline Clinic</strong> — Multilingual clinic site (
                <Link href="/projects/caroline-clinic">overview</Link>)
              </li>
              <li>
                <strong>License Notifier</strong> — Expiry alerts (LINE/Email) (
                <Link href="/projects/license-notifier">details</Link>)
              </li>
            </ul>
          </section>
        </div>

        {/* Right column */}
        <aside className="col">
          <section className="block">
            <h2 className="h2">Skills</h2>
            <div className="skills">
              <div>
                <h3 className="h3">Frontend</h3>
                <ul className="tags">
                  {SKILLS.frontend.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="h3">Backend</h3>
                <ul className="tags">
                  {SKILLS.backend.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="h3">Tooling</h3>
                <ul className="tags">
                  {SKILLS.tooling.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="block">
            <h2 className="h2">Education</h2>
            <ul className="list">
              {EDUCATION.map((ed) => (
                <li key={ed.title}>
                  <div className="row">
                    <span>{ed.title}</span>
                    <span className="muted">{ed.year}</span>
                  </div>
                  <div className="muted">{ed.org}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="block">
            <h2 className="h2">Languages</h2>
            <ul className="list">
              {LANGS.map((l) => (
                <li key={l.name} className="row">
                  <span>{l.name}</span>
                  <span className="muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="block">
            <h2 className="h2">Certifications</h2>
            <ul className="list">
              {CERTS.map((c) => (
                <li key={c.title} className="row">
                  <span>{c.title}</span>
                  <span className="muted">
                    {[c.org, c.year].filter(Boolean).join(' • ')}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="block note">
            <p className="muted">
              © {year} Wee • Profile — references available upon request.
            </p>
          </section>
        </aside>
      </section>
    </div>
  )
}
