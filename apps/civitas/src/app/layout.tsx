import './globals.css'

import { cn } from '@ed-rio/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CIVITAS',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={cn(inter.className, 'overflow-y-hidden')}>
        <Toaster duration={4000} />
        {children}
      </body>
    </html>
  )
}
