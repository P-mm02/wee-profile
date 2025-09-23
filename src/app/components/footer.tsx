'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import './footer.css'

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        {/* Brand / blurb */}
        <section className="footer-col footer-brand">
          <div className="brand-line">
            <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 17L9 5l3 6 3-6 6 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="brand-name">Wee • Profile</span>
          </div>
          <p className="muted">
            Software engineer. Groundwater veteran. Building useful things with
            clean code and real-world grit.
          </p>

          <div className="social">
            <a
              className="social-link"
              href="https://github.com/your-github"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path
                  d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.15-1.12-1.46-1.12-1.46-.91-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04 .9 1.53 2.36 1.09 2.94.83 .09-.66.35-1.1.64-1.35-2.22-.26-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.3 2.74-1.02 2.74-1.02 .55 1.4.2 2.44.11 2.7 .64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.67-4.57 4.93 .36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a
              className="social-link"
              href="https://www.linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path
                  d="M6.94 8.5V20H3.5V8.5h3.44ZM5.22 4a2 2 0 1 1 0 4.001 2 2 0 0 1 0-4Zm5.9 16h-3.44V8.5h3.3v1.57h.05c.46-.87 1.6-1.8 3.3-1.8C17.9 8.27 20.5 10 20.5 14v6h-3.44v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.12 1.43-2.12 2.9V20Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a
              className="social-link"
              href="mailto:hello@example.com"
              aria-label="Email"
              title="Email"
            >
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path
                  d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 2-8 5L4 8m16 8H4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Quick nav */}
        <nav className="footer-col footer-links" aria-label="Footer">
          <div>
            <h3 className="footer-title">Site</h3>
            <ul className="list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Explore</h3>
            <ul className="list">
              <li>
                <a
                  href="https://github.com/your-github"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@your-handle"
                  target="_blank"
                  rel="noreferrer"
                >
                  Articles
                </a>
              </li>
              <li>
                <a href="/resume.pdf">Resume</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Contact */}
        <section className="footer-col footer-contact">
          <h3 className="footer-title">Contact</h3>
          <address className="addr">
            Thailand · GMT+7
            <br />
            <a href="mailto:hello@example.com">hello@example.com</a>
          </address>
        </section>
      </div>

      <div className="footer-bar">
        <small className="muted">
          © {year} Wee • Profile. All rights reserved.
        </small>
        <a
          href="#top"
          className={`to-top ${showTop ? 'show' : ''}`}
          aria-label="Back to top"
          title="Back to top"
        >
          <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
            <path
              d="M12 19V5m0 0 6 6M12 5 6 11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Top</span>
        </a>
      </div>
    </footer>
  )
}
