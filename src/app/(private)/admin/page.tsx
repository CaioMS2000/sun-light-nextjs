import UploadForm from './components/uploadForm'
import { Separator } from '@/components/ui/separator'
import ProjectsArea from './components/projectsArea'
import Header from './header'
import { Suspense } from 'react'
import LoadingComponent from './loading'
import LogoutSection from './components/logoutSection'

export default function Admin() {
	return (
		<>
			<Header />
			<LogoutSection />
			<UploadForm />
			<Separator />
			<Suspense fallback={<LoadingComponent />}>
				<ProjectsArea />
			</Suspense>
			<div id="white-space" className="h-14 bg-transparent"></div>
		</>
	)
}
