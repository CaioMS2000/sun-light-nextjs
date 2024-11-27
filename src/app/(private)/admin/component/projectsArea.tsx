import { ProcessedProject } from '@/@types/project'
import ProjectBox from './projectBox'
import { Hotel } from 'lucide-react'

export default async function ProjectsArea() {
	const url = new URL('/get-projects', process.env.__NEXT_PRIVATE_ORIGIN)
	const response = await fetch(url)
	const data = await response.json()

	return (
		<>
			<h3 className="my-10 ml-2 inline-flex items-center gap-2 font-bold text-2xl">
				<Hotel />
				Projetos
			</h3>
			<div className="flex flex-col gap-6">
				{data.projects?.map((project: ProcessedProject) => (
					<ProjectBox key={project.id} {...project} />
				))}
			</div>
		</>
	)
}
