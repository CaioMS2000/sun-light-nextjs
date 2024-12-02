import { Suspense } from 'react'
import { cookies } from 'next/headers'
import ProjectsArea from '@/components/projects-area'
import HeaderComponent from './components/header'
import { USERNAME_COOKIE } from '@/constants/cookies'

export default async function Projects() {
	const cookieStore = await cookies()
	const usernameCookie = cookieStore.get(USERNAME_COOKIE)

	return (
		<>
			<HeaderComponent />
			<Suspense>
				<ProjectsArea isAdmin={!!usernameCookie} />
			</Suspense>
			<div id="white-space" className="h-5 bg-transparent"></div>
		</>
	)
}
