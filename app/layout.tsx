import Image from 'next/image'
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'BMW × Clemson — Data Valuation',
  description: 'Midterm update: Cost, Benefit, Integrated, Alternative (Hedonic)'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
  <Image
  src="/uploads/bmw_clemson_lockup.png"
  alt="BMW × Clemson"
  width={240}            // fallback size (can leave as-is)
  height={64}
  className="h-10 md:h-12 lg:h-14 w-auto rounded-md ring-1 ring-white/10"
  priority
  sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
/>

  <span className="sr-only">BMW × Clemson</span>
</Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/cost" className="hover:text-brand">Cost</Link>
              <Link href="/benefit" className="hover:text-brand">Benefit</Link>
              <Link href="/integrated" className="hover:text-brand">Integrated</Link>
              <Link href="/alternative" className="hover:text-brand">Alternative</Link>
            </div>
          </div>
        </nav>

        <main className="container py-10">{children}</main>

        <footer className="mt-20 border-t border-white/10">
          <div className="container py-8 text-sm text-white/70 flex flex-wrap items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} Clemson University — AI Optimization & Manufacturing CI</span>
            <span className="text-white/50">Built for BMW midterm update</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
