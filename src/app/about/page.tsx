import Image from 'next/image'
import Link from 'next/link'
import './page.css'

type Skill = { name: string; level: number } // level 0–100
type SkillGroup = { title: string; items: Skill }
type TimelineItem = { date: string; title: string; text: string }

const frontend: Skill[] = [
  { name: 'Next.js', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'React', level: 86 },
  { name: 'CSS (Arch & Perf)', level: 84 },
]

const backend: Skill[] = [
  { name: 'Node.js', level: 86 },
  { name: 'MongoDB / Mongoose', level: 88 },
  { name: 'API Design', level: 85 },
  { name: 'Auth & Security', level: 78 },
]

const tools: Skill[] = [
  { name: 'Netlify / CI', level: 82 },
  { name: 'Git / GitHub', level: 85 },
  { name: 'i18n & SEO', level: 76 },
  { name: 'Data Viz / ETL', level: 70 },
]

const timeline: TimelineItem[] = [
  {
    date: 'Now',
    title: 'Freelance & Founder-in-progress',
    text: 'Building pragmatic web apps for clinics, operations, and data portals. Focused on clean schemas and maintainable UIs.',
  },
  {
    date: '2024–2025',
    title: 'SGW Project Manager',
    text: 'Operational planning platform (members, projects, licenses, notifications) — Next.js + MongoDB.',
  },
  {
    date: '2023–2024',
    title: 'Caroline Clinic site',
    text: 'Multilingual clinic website with admin tooling and SEO-ready content model.',
  },
]

export default function AboutPage() {
  return (
    <div className="about">
      {/* HERO */}
      <section className="about-hero">
        <div className="avatar-wrap" aria-hidden="true">
          <Image
            src="/images/profile/profileImage.png" // put your image in /public/images/
            width={220}
            height={220}
            alt="Wee profile portrait"
            className="avatar"
            priority
          />
          <div className="ring" />
        </div>

        <div className="intro">
          <h1 className="title">
            About <span className="accent">Wee</span>
          </h1>
          <p className="lede">
            Software Engineer from Thailand (GMT+7). I design & ship
            production-grade web apps with a bias for clarity, speed, and
            long-term maintainability.
          </p>

          <ul className="chips" aria-label="Focus areas">
            <li>Next.js + TypeScript</li>
            <li>MongoDB / Mongoose</li>
            <li>Ops tooling & dashboards</li>
            <li>i18n</li>
          </ul>

          <div className="actions">
            <Link href="/contact" className="btn primary">
              Work with me
            </Link>
            <a href="/resume.pdf" className="btn ghost">
              Download résumé
            </a>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="about-grid">
        {/* BIO */}
        <article className="panel">
          <h2 className="h2">Bio</h2>
          <p>
            I blend hands-on operations experience with software pragmatism. My
            approach: model the domain carefully, keep APIs predictable, and
            make the UI obvious. I like eliminating friction and shipping small
            slices quickly — then iterating with data.
          </p>
          <p className="muted">
            Recent work includes SGW Project Manager (operations planning), a
            multilingual clinic site, and water compliance tooling.
          </p>
        </article>

        {/* QUICK FACTS */}
        <aside className="panel facts" aria-label="Quick facts">
          <h2 className="h2">Quick facts</h2>
          <ul className="facts-list">
            <li>
              <span>Location</span>
              <strong>Thailand • GMT+7</strong>
            </li>
            <li>
              <span>Languages</span>
              <strong>English, ไทย</strong>
            </li>
            <li>
              <span>Available</span>
              <strong>Freelance / Contract</strong>
            </li>
            <li>
              <span>Stack</span>
              <strong>Next.js, TS, Node, MongoDB</strong>
            </li>
          </ul>
        </aside>

        {/* SKILLS */}
        <article className="panel">
          <h2 className="h2">Skills</h2>

          <div className="skills">
            <div className="skill-col">
              <h3 className="h3">Frontend</h3>
              <ul className="skill-list">
                {frontend.map((s) => (
                  <li key={s.name} className="skill">
                    <span className="skill-name">{s.name}</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                    <span className="skill-val">{s.level}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="skill-col">
              <h3 className="h3">Backend</h3>
              <ul className="skill-list">
                {backend.map((s) => (
                  <li key={s.name} className="skill">
                    <span className="skill-name">{s.name}</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                    <span className="skill-val">{s.level}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="skill-col">
              <h3 className="h3">Tools</h3>
              <ul className="skill-list">
                {tools.map((s) => (
                  <li key={s.name} className="skill">
                    <span className="skill-name">{s.name}</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                    <span className="skill-val">{s.level}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        {/* TIMELINE */}
        <article className="panel">
          <h2 className="h2">Timeline</h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.title} className="tl-item">
                <div className="tl-dot" aria-hidden="true" />
                <div className="tl-meta">
                  <div className="tl-date">{t.date}</div>
                  <div className="tl-title">{t.title}</div>
                  <p className="tl-text">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="cta-wrap">
          <h2 className="h2">Let’s build something useful</h2>
          <p className="muted">
            Need a clean dashboard, an operations tool, or a multilingual site?
            I can scope, architect, and ship it — then help you iterate.
          </p>
          <div className="actions">
            <Link href="/contact" className="btn primary">
              Start a conversation
            </Link>
            <Link href="/projects" className="btn ghost">
              See projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
