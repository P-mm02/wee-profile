// src/app/projects/page.tsx
import { Suspense } from 'react'
import ProjectsClient from './ProjectsClient'

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="site-main">Loading projects…</div>}>
      <ProjectsClient />
    </Suspense>
  )
}
