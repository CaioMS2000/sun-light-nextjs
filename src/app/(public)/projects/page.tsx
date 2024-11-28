import ProjectsArea from '@/components/projects-area'
import HeaderComponent from './components/header'
import { Suspense } from 'react'

export default function Projects() {
	return (
		<>
			<HeaderComponent />
			<Suspense>
				<ProjectsArea />
			</Suspense>
		</>
	)
}
