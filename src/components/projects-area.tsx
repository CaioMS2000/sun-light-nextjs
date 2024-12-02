'use client'
import { Project } from '@/@types/project'
import ProjectBox from './project-box'
import { Hotel, MoveDown, MoveUp } from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from './loading-component'
import { Pagination } from './pagination'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Button } from './ui/button'

interface ProjectsAreaProps {
	isAdmin?: boolean
}

export default function ProjectsArea({ isAdmin = false }: ProjectsAreaProps) {
	const searchParams = useSearchParams()
	const router = useRouter()
	const params = new URLSearchParams(searchParams.toString())
	const pathname = usePathname()
	const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? 1)

	params.set('page', `${pageIndex}`)

	const order = z
		.enum(['pot-desc', 'pot-asc', 'est-desc', 'est-asc'])
		.optional()
		.nullable()
		.parse(searchParams.get('order'))
	const { data: projectData, isLoading } = useQuery({
		queryKey: ['projects', pageIndex, order],
		queryFn: async () => {
			const response = await fetch(`/system/get-projects/?${params.toString()}`)
			const result = await response.json()

			return result
		},
		staleTime: 1000 * 60 * 60 * 24,
	})

	function handlePaginate(page: number) {
		params.set('page', `${page}`)
		router.push(`${pathname}?${params.toString()}`)
	}

	function handleSelectFilter(value: typeof order) {
		if (!value) {
			params.delete('order')
		} else {
			params.set('order', value)
		}
		router.push(`${pathname}?${params.toString()}`)
	}

	return (
		<>
			<div className="my-10 ml-2 flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
				<h3 className="inline-flex items-center gap-2 font-bold text-2xl">
					<Hotel />
					Projetos
				</h3>
				<Select
					onValueChange={e => handleSelectFilter(e as typeof order)}
					value={order ?? undefined}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filtrar" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="pot-desc">
								<div className="inline-flex items-center gap-3">
									<MoveDown className="size-5" />
									<span>Potência</span>
								</div>
							</SelectItem>
							<SelectItem value="pot-asc">
								<div className="inline-flex items-center gap-3">
									<MoveUp className="size-5" />
									<span>Potência</span>
								</div>
							</SelectItem>
							<SelectItem value="est-desc">
								<div className="inline-flex items-center gap-3">
									<MoveDown className="size-5" />
									<span>Estimativa</span>
								</div>
							</SelectItem>
							<SelectItem value="est-asc">
								<div className="inline-flex items-center gap-3">
									<MoveUp className="size-5" />
									<span>Estimativa</span>
								</div>
							</SelectItem>
						</SelectGroup>
						<SelectSeparator />
						<Button
							className="w-full px-2"
							variant="secondary"
							size="sm"
							onClick={e => {
								e.stopPropagation()
								handleSelectFilter(null)
							}}
						>
							Sem filtro
						</Button>
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-6">
				{projectData && (
					<>
						{projectData.projects.map((project: Project) => (
							<ProjectBox key={project.id} {...project} isAdmin={isAdmin} />
						))}
						<Pagination
							pageIndex={pageIndex}
							totalPages={projectData.meta.totalCount}
							perPage={projectData.meta.perPage}
							onPageChange={handlePaginate}
						/>
					</>
				)}
				{isLoading && <LoadingComponent />}
			</div>
		</>
	)
}
