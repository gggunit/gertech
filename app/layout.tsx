import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Gertech - Premium Tech Support & Handiwork Services',
  description: 'Expert AI automation, tech support, home repairs, and more. Bay Area based, professional and reliable.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
