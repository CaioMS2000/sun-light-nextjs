export interface Project {
	id: number
	name: string
	address: string
	potency: number
	estimation: number
	pj: boolean
	imageURLs: string[]
	createdAt: string
	updatedAt: string
}

export type ProcessedProject = Omit<
	Project,
	'imageURLs' | 'createdAt' | 'updatedAt'
> & {
	images: string[]
}

export type ProjectsQueryCache = {
	projects: ProcessedProject[]
	meta: {
		page: number
		perPage: number
		totalCount: number
	}
}
