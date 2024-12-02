'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Button } from './ui/button'

interface EditProjectButtonProps {
	projectId: number
	className?: string
	children: ReactNode
	isAdmin?: boolean
}

export default function EditProjectButton({
	projectId,
	isAdmin,
	children,
	className,
}: EditProjectButtonProps) {
	const router = useRouter()

	function handleClick() {
		if (!isAdmin) return

		router.push(`/admin/edit-project/${projectId}`)
	}
	return (
		<>
			<Button
				type="button"
				onClick={handleClick}
				className={cn('', className, {
					invisible: !isAdmin,
					'w-0': !isAdmin,
					'h-0': !isAdmin,
				})}
				disabled={!isAdmin}
			>
				{children}
			</Button>
		</>
	)
}
