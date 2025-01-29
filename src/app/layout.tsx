import type { Metadata } from 'next'

import { ReactNode } from 'react'

import Footer from '@/app/footer/Footer'
import { Navbar } from '@/app/navbar/Navbar'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

import SessionProvider from './SessionProvider'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  description: 'Our Prices May Cause Spontaneous Smiling',
  title: 'Ecommerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body
        className={`flex min-h-screen flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          <main className={'m-auto min-w-[320px] max-w-7xl flex-1 flex-shrink flex-col p-4'}>
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
