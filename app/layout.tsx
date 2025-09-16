import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Gertech - Premium Tech Support & Handiwork Services',
  description: 'Expert AI automation, tech support, home repairs, and more. Bay Area based, professional and reliable.',
  keywords: 'tech support, AI automation, home repairs, plant care, calendar management',
  openGraph: {
    title: 'Gertech - Premium Tech & Handiwork',
    description: 'Friendly, skilled help for your digital life and home.',
    images: '/og-image.png',  // Add a public image later
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
