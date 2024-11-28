'use client'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { logoutUser } from '@/functions/log-out'
import { useRouter } from 'next/navigation'

export default function LogoutSection() {
	const router = useRouter()
	async function handleLogout() {
		logoutUser()
		await router.push('/')
	}
	return (
		<>
			<div className="flex justify-end">
				<Button
					type="button"
					variant="link"
					className="h-fit text-red-500"
					onClick={handleLogout}
				>
					<LogOutIcon />
					Logout
				</Button>
			</div>
		</>
	)
}
