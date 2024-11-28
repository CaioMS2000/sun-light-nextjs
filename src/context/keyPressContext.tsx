'use client'
import { useRouter, usePathname } from 'next/navigation'
import React, { createContext, useEffect, useState, ReactNode } from 'react'

type KeyPressContextType = {
	sequence: string[]
}

export const KeyPressContext = createContext<KeyPressContextType>({
	sequence: [],
})

export const KeyPressProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const pathname = usePathname()
	const excludedRoutes = ['/admin']
	const [sequence, setSequence] = useState<string[]>([])
	const targetWord = 'admin'
	const [wordMatched, setWordMatched] = useState(false)

	useEffect(() => {
		const isExcluded = excludedRoutes.includes(pathname)
		if (isExcluded) {
			return
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement
			if (
				target.tagName === 'INPUT' ||
				target.tagName === 'TEXTAREA' ||
				target.isContentEditable
			) {
				return
			}

			if (e.key === 'Escape') {
				setSequence([])
				return
			}

			setSequence(prev => {
				const updatedSequence = [...prev, e.key].slice(-targetWord.length)

				if (updatedSequence.join('') === targetWord) {
					setWordMatched(true)
					return []
				}

				return updatedSequence
			})
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [pathname])

	useEffect(() => {
		if (wordMatched) {
			router.push('/admin')
			setWordMatched(false)
		}
	}, [wordMatched, router])

	return (
		<KeyPressContext.Provider value={{ sequence }}>
			{children}
		</KeyPressContext.Provider>
	)
}
