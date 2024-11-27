import UploadForm from './component/uploadForm'
import { Separator } from '@/components/ui/separator'
import ProjectsArea from './component/projectsArea'
import Header from './header'

export default function Admin() {
	return (
		<>
			<Header />
			<UploadForm />
			<Separator />
			<ProjectsArea />

			<div id="white-space" className="h-14 bg-transparent"></div>
		</>
	)
}
