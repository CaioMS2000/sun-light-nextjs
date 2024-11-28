import { AMOUNT_PER_REQUEST } from '@/constants/database'
import { prisma } from '@/lib/prisma'

export async function getProjects(page: number) {
	const totalCount = await prisma.project.count()
	const projects = await prisma.project.findMany({
		take: AMOUNT_PER_REQUEST,
		skip: (page - 1) * AMOUNT_PER_REQUEST,
		orderBy: {
			createdAt: 'desc',
		},
	})

	return { projects, meta: { page, perPage: AMOUNT_PER_REQUEST, totalCount } }
}
