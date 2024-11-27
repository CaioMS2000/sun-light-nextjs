import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'

import './globals.css'
import Providers from './providers'

const interTight = Inter_Tight({ subsets: ['latin'] })

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
			<body className={`antialiased ${interTight.className} overflow-x-hidden`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
