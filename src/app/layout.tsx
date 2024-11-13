import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sun Light',
  description: 'Sun Light - Engenharia do Sol',
  icons: {
    icon: '/sun-fill.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={'dark antialiased'}>{children}</body>
    </html>
  )
}
