import UploadForm from './components/upload-form'
import { Separator } from '@/components/ui/separator'
import ProjectsArea from '@/components/projects-area'
import Header from './components/header'
import { Suspense } from 'react'
import LoadingComponent from './loading'
import LogoutSection from './components/logout-section'

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
