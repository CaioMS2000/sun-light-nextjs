import { AMOUNT_PER_REQUEST } from '@/constants/database'
import { prisma } from '@/lib/prisma'

export async function getProject(id: number) {
	const project = await prisma.project.findUnique({ where: { id } })

	return { project }
}
