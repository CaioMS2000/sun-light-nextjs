'use server'

import { randomUUID } from 'node:crypto'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { awsClient } from '@/lib/aws'
import { CreateProjectFormData } from './schema/create-project-schema'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const b = Buffer.from('')
async function makeBuffer(file: CreateProjectFormData['files'][number]) {
	const arrayBuffer = await file.arrayBuffer()
	// const buffer: Buffer<ArrayBufferLike> = Buffer.from(arrayBuffer) // on build throws: Type error: Type 'Buffer' is not generic.
	const buffer: Buffer = Buffer.from(arrayBuffer)
	return buffer
}

export async function createProjectAction(data: CreateProjectFormData) {
	const { files, address, estimation, name, pj, potency } = data

	if (!files || files.length === 0) {
		return new Error('No files uploaded')
	}

	const uploadResults = []
	const imageURLs: string[] = []

	for (const file of files) {
		const fileContent = await makeBuffer(file)
		const uniqueFilename = `test-${randomUUID()}-${file.name}`
		const contentType = file.type

		const command = new PutObjectCommand({
			Bucket: env.AWS_BUCKET_NAME!,
			Key: uniqueFilename,
			Body: fileContent,
			ContentType: contentType,
		})

		await awsClient.send(command)

		uploadResults.push({
			filename: uniqueFilename,
			originalFilename: file.originalFilename,
		})
		imageURLs.push(uniqueFilename)
	}

	const preData = {
		address: address,
		estimation: Number.parseFloat(estimation),
		name: name,
		potency: Number.parseFloat(potency),
		pj: Boolean(pj),
		imageURLs,
	}

	const newProject = await prisma.project.create({
		data: {
			address: preData.address,
			estimation: preData.estimation,
			name: preData.name,
			potency: preData.potency,
			pj: preData.pj,
			imageURLs: preData.imageURLs,
		},
	})

	revalidatePath('/projects')
	revalidatePath('/admin')

	return newProject
}
