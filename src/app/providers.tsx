'use client'
import { Toaster } from '@/components/ui/sonner'
import { KeyPressProvider } from '@/context/keyPressContext'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Toaster richColors />
			<KeyPressProvider>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</KeyPressProvider>
		</>
	)
}
