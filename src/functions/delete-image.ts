import { prisma } from '@/lib/prisma'

export async function deleteImage(image: string, projectId: number) {
	const project = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
		select: {
			imageURLs: true,
		},
	})

	if (!project) throw new Error('Project not found')

	await prisma.project.update({
		where: {
			id: projectId,
		},
		data: {
			imageURLs: project.imageURLs.filter(url => url !== image),
		},
	})
}
