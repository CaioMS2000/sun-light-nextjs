import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whats-app-button'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			{children}
			<WhatsAppButton />
			<Footer />
		</>
	)
}
