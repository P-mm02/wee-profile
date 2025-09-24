import Link from 'next/link'
import './page.css'

type Project = {
  title: string
  summary: string
  tags: string[]
  href: string
}

const featured: Project[] = [
  {
    title: 'SGW Project Manager',
    summary:
      'Next.js + MongoDB platform for Ops planning, members, licenses, and reporting.',
    tags: ['Next.js', 'TypeScript', 'MongoDB'],
    href: '/projects/sgw-project-manager',
  },
  {
    title: 'Caroline Clinic Website',
    summary:
      'Multilingual clinic site with clean IA, SEO-ready content model, and admin tools.',
    tags: ['Next.js', 'i18n', 'CMS'],
    href: '/projects/caroline-clinic',
  },
  {
    title: 'Groundwater Data Portal',
    summary:
      'Industrial water dashboards, QA pipelines, and compliance reporting in one view.',
    tags: ['Data Viz', 'ETL', 'Compliance'],
    href: '/projects/groundwater-portal',
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-topline">
          <span className="badge">Available for freelance</span>
          <span className="dot">•</span>
          <span className="muted">Thailand (GMT+7)</span>
        </div>

        <h1 className="hero-title">
          Hi, I’m <span className="accent">Wee</span> — Software Engineer
          building pragmatic, production-grade web apps.
        </h1>

        <p className="hero-sub">
          I mix fast execution with long-term maintainability: clean schemas,
          focused UIs, and reliable automations. If it ships and scales, I like
          it.
        </p>

        <div className="hero-cta">
          <Link className="btn primary" href="/contact">
            Let’s work together
          </Link>
          <Link className="btn ghost" href="/projects">
            View projects
          </Link> 
          <a className="btn ghost" href="/resume">
            Resume
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">2+ yrs</div>
            <div className="stat-label muted">Industry exposure</div>
          </div>
{/*           <div className="stat">
            <div className="stat-num">50+ </div>
            <div className="stat-label muted">Deploys & launches</div>
          </div>
 */}          <div className="stat">
            <div className="stat-num">99.9%</div>
            <div className="stat-label muted">Uptime targets</div>
          </div>
        </div>

        <div className="hero-deco" aria-hidden="true" />
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights" aria-label="Core strengths">
        <article className="card">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M4 7h16M7 12h10M9 17h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="card-title">Solid architecture</h3>
          <p className="card-text">
            Typed models, predictable APIs, and clean boundaries for long-term
            speed.
          </p>
        </article>

        <article className="card">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 3v18M3 12h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="card-title">UX that moves</h3>
          <p className="card-text">
            Snappy, readable interfaces with minimal friction and clear actions.
          </p>
        </article>

        <article className="card">
          <div className="card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M5 12l4 4L19 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="card-title">Ship & iterate</h3>
          <p className="card-text">
            Deliver value early, monitor, then refine with data-driven changes.
          </p>
        </article>
      </section>

      {/* PROJECTS */}
      <section className="projects">
        <div className="section-head">
          <h2 className="section-title">Featured projects</h2>
          <Link className="link-more" href="/projects">
            See all
          </Link>
        </div>

        <div className="grid">
          {featured.map((p) => (
            <article key={p.title} className="project-card">
              <div className="pc-body">
                <h3 className="pc-title">
                  <Link href={p.href}>{p.title}</Link>
                </h3>
                <p className="pc-summary">{p.summary}</p>
                <ul className="pc-tags" aria-label="Technologies">
                  {p.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
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
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-wrap">
          <h2 className="cta-title">Have a project in mind?</h2>
          <p className="cta-text">
            I can help scope, architect, and ship it—cleanly and on time.
          </p>
          <div className="cta-actions">
            <Link className="btn primary" href="/contact">
              Start a conversation
            </Link>
            <Link className="btn ghost" href="/about">
              About me
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
