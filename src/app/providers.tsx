import { KeyPressProvider } from '@/context/keyPressContext'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<KeyPressProvider>{children}</KeyPressProvider>
		</>
	)
}
