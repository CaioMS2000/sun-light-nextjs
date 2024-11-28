'use client'
import { ProcessedProject } from '@/@types/project'
import ProjectBox from './projectBox'
import { Hotel } from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from './loadingComponent'
import { Pagination } from './pagination'

export default function ProjectsArea() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const params = new URLSearchParams(searchParams.toString())
	const pathname = usePathname()
	const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? 1)
	const { data, isLoading } = useQuery({
		queryKey: ['orders', pageIndex],
		queryFn: async () => {
			const response = await fetch(`get-projects/?page=${pageIndex}`)
			const result = await response.json()

			return result
		},
	})

	function handlePaginate(page: number) {
		params.set('page', `${page}`)
		router.push(`${pathname}?${params.toString()}`)
	}

	return (
		<>
			<h3 className="my-10 ml-2 inline-flex items-center gap-2 font-bold text-2xl">
				<Hotel />
				Projetos
			</h3>
			<div className="flex flex-col gap-6">
				{data && (
					<>
						{data.projects.map((project: ProcessedProject) => (
							<ProjectBox key={project.id} {...project} />
						))}
						<Pagination
							pageIndex={pageIndex}
							totalPages={data.meta.totalCount}
							perPage={data.meta.perPage}
							onPageChange={handlePaginate}
						/>
					</>
				)}
				{!data && <LoadingComponent />}
			</div>
		</>
	)
}
