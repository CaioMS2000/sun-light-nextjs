import UploadForm from './component/uploadForm'
import { Separator } from '@/components/ui/separator'
import ProjectsArea from './component/projectsArea'
import Header from './header'
import { Suspense } from 'react'

export default function Admin() {
	return (
		<>
			<Header />
			<UploadForm />
			<Separator />
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectsArea />
			</Suspense>

			<div id="white-space" className="h-14 bg-transparent"></div>
		</>
	)
}
