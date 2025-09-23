// src/app/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to your observability tool here
    console.error(error)
  }, [error])

  return (
    <main className="site-main">
      <h1>Something went wrong</h1>
      <p className="muted">We hit an unexpected error. Please try again.</p>
      <button className="btn" onClick={() => reset()}>
        Try again
      </button>
    </main>
  )
}
