import { prisma } from '@/lib/prisma'

export async function getProjects(page: number) {
	const totalCount = await prisma.project.count()
	const projects = await prisma.project.findMany({
		take: 10,
		skip: (page - 1) * 10,
	})

	return { projects, meta: { page, perPage: 10, totalCount } }
}
