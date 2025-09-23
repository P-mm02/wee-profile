'use client'

import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import './page.css'

type Project = {
  title: string
  summary: string
  tags: string[]
  href: string
  year: number
  status?: 'Live' | 'In Progress' | 'Internal'
}

const DATA: Project[] = [
  {
    title: 'SGW Project Manager',
    summary:
      'Operations planning platform for members, projects, licenses, and notifications.',
    tags: ['Next.js', 'TypeScript', 'MongoDB'],
    href: '/projects/sgw-project-manager',
    year: 2025,
    status: 'Live',
  },
  {
    title: 'Caroline Clinic Website',
    summary:
      'Multilingual clinic site with SEO-ready content model and admin tools.',
    tags: ['Next.js', 'i18n', 'SEO'],
    href: '/projects/caroline-clinic',
    year: 2024,
    status: 'Live',
  },
  {
    title: 'Groundwater Data Portal',
    summary:
      'Dashboards for industrial water, QA pipelines, and compliance reporting.',
    tags: ['Data Viz', 'ETL', 'Compliance'],
    href: '/projects/groundwater-portal',
    year: 2024,
    status: 'Internal',
  },
  {
    title: 'Wee • Profile',
    summary:
      'This site — clean tokens, dark theme, and App Router best practices.',
    tags: ['Next.js', 'Design System'],
    href: '/projects/wee-profile',
    year: 2025,
    status: 'In Progress',
  },
  {
    title: 'License Expiry Notifier',
    summary:
      'Cron + webhook alerts for groundwater drilling license renewals via LINE/Email.',
    tags: ['Automation', 'LINE', 'MongoDB'],
    href: '/projects/license-notifier',
    year: 2025,
  },
  {
    title: 'Next.js Boilerplate',
    summary:
      'Reusable template: brand config, i18n hooks, global CSS variables, structured routes.',
    tags: ['Starter', 'TypeScript', 'Netlify'],
    href: '/projects/nextjs-boilerplate',
    year: 2025,
  },
  {
    title: 'Operational Plan Dashboard',
    summary:
      'Gantt-style schedules with drag-scroll, members view, and quick-add interactions.',
    tags: ['UX', 'Scheduling', 'Next.js'],
    href: '/projects/operational-plan',
    year: 2025,
  },
]

const ALL_TAGS = Array.from(new Set(DATA.flatMap((p) => p.tags))).sort()

type SortKey = 'recent' | 'a-z'

export default function ProjectsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  // --- URL-synced state
  const [query, setQuery] = useState(() => params.get('q') ?? '')
  const [sort, setSort] = useState<SortKey>(
    () => (params.get('sort') as SortKey) || 'recent'
  )
  const [activeTags, setActiveTags] = useState<string[]>(
    () => params.get('tags')?.split(',').filter(Boolean) ?? []
  )

  // keep URL in sync
  useEffect(() => {
    const sp = new URLSearchParams()
    if (query) sp.set('q', query)
    if (activeTags.length) sp.set('tags', activeTags.join(','))
    if (sort !== 'recent') sp.set('sort', sort)
    const url = sp.toString() ? `${pathname}?${sp.toString()}` : pathname
    router.replace(url, { scroll: false })
  }, [query, activeTags, sort, pathname, router])

  // derived list
  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let res = DATA.filter((p) => {
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      const matchTags =
        activeTags.length === 0 || activeTags.every((t) => p.tags.includes(t))
      return matchQ && matchTags
    })

    if (sort === 'recent') {
      res = res.sort(
        (a, b) => b.year - a.year || a.title.localeCompare(b.title)
      )
    } else {
      res = res.sort((a, b) => a.title.localeCompare(b.title))
    }
    return res
  }, [query, activeTags, sort])

  const toggleTag = (tag: string) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )

  const clearFilters = () => {
    setQuery('')
    setActiveTags([])
    setSort('recent')
  }

  return (
    <div className="projects-page">
      {/* Header */}
      <header className="projects-header">
        <h1 className="title">Projects</h1>
        <p className="subtitle muted">
          Real, production-minded work. Filter by tech or search titles &
          summaries.
        </p>
      </header>

      {/* Filters */}
      <section className="filters" aria-label="Project filters">
        <div className="bar">
          <div className="input-wrap">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M11 19a8 8 0 1 1 5.292-14.001A8 8 0 0 1 11 19Zm9 3-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
            />
          </div>

          <div className="select-wrap">
            <label htmlFor="sort" className="sr-only">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="recent">Recent</option>
              <option value="a-z">A–Z</option>
            </select>
          </div>

          <button
            className="btn ghost"
            onClick={clearFilters}
            aria-label="Clear filters"
          >
            Clear
          </button>
        </div>

        <div className="chips" role="listbox" aria-label="Filter by tag">
          <button
            className={`chip ${activeTags.length === 0 ? 'active' : ''}`}
            onClick={() => setActiveTags([])}
            aria-selected={activeTags.length === 0}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              className={`chip ${activeTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
              aria-selected={activeTags.includes(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="count muted">
          {list.length} result{list.length !== 1 ? 's' : ''}
        </div>
      </section>

      {/* Grid */}
      {list.length ? (
        <section className="grid" aria-label="Project results">
          {list.map((p) => (
            <article key={p.title} className="project-card">
              <div className="pc-head">
                <span className="year">{p.year}</span>
                {p.status && (
                  <span
                    className={`status ${
                      p.status === 'Live'
                        ? 'ok'
                        : p.status === 'In Progress'
                        ? 'warn'
                        : 'muted'
                    }`}
                    aria-label={`Status: ${p.status}`}
                  >
                    {p.status}
                  </span>
                )}
              </div>

              <h2 className="pc-title">
                <Link href={p.href}>{p.title}</Link>
              </h2>
              <p className="pc-summary">{p.summary}</p>

              <ul className="pc-tags" aria-label="Technologies">
                {p.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="pc-actions">
                <Link
                  className="btn tiny"
                  href={p.href}
                  aria-label={`Open ${p.title}`}
                >
                  Open
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <p className="no-results muted">No projects match your filters.</p>
      )}
    </div>
  )
}
