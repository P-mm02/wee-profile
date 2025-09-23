// src/app/not-found.tsx (server component)
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="site-main">
      <h1>404 — Not found</h1>
      <p className="muted">The page you’re looking for doesn’t exist.</p>
      <p>
        <Link className="btn" href="/">
          Go home
        </Link>
      </p>
    </main>
  )
}
