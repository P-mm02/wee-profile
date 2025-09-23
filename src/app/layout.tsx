// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import Nav from './components/nav'
import Footer from './components/footer'

export const metadata: Metadata = {
  title: 'Wee • Profile',
  description: 'Personal profile site built with Next.js',
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1115' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id="top">
        <Nav />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
