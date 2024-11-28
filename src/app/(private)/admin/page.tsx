import UploadForm from './component/uploadForm'
import { Separator } from '@/components/ui/separator'
import ProjectsArea from './component/projectsArea'
import Header from './header'
import { Suspense } from 'react'
import LoadingComponent from './loading'
import LogoutSection from './component/logoutSection'

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
