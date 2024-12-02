import { AMOUNT_PER_REQUEST } from '@/constants/database'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Prisma } from '@prisma/client/'

const orderSchema = z
	.enum(['pot-desc', 'pot-asc', 'est-desc', 'est-asc'])
	.optional()
	.nullable()
const orderMapper: Record<string, Prisma.ProjectOrderByWithRelationInput> = {
	'pot-desc': {
		potency: 'desc',
	},
	'pot-asc': {
		potency: 'asc',
	},
	'est-desc': {
		estimation: 'desc',
	},
	'est-asc': {
		estimation: 'asc',
	},
}

interface GetProjectsParams {
	page: number
	order?: string | null
}

export async function getProjects({ page, order }: GetProjectsParams) {
	try {
		const parsedOrder = orderSchema.parse(order)
		const orderBy: Prisma.ProjectOrderByWithRelationInput = parsedOrder
			? orderMapper[parsedOrder]
			: { id: 'asc' }
		const totalCount = await prisma.project.count()
		const projects = await prisma.project.findMany({
			take: AMOUNT_PER_REQUEST,
			skip: (page - 1) * AMOUNT_PER_REQUEST,
			orderBy,
		})

		return { projects, meta: { page, perPage: AMOUNT_PER_REQUEST, totalCount } }
	} catch (error) {
		console.error(error)
	}
	return {
		projects: [],
		meta: { page, perPage: AMOUNT_PER_REQUEST, totalCount: 0 },
	}
}
