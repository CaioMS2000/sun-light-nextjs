import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import multiparty from 'multiparty'
import { Readable } from 'node:stream'
import { IncomingMessage } from 'node:http'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { awsClient } from '@/lib/aws'

export const config = {
	api: {
		bodyParser: false,
	},
}

const mimeTypes: Record<string, string> = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
}

const toNodeReadable = (
	readableStream: ReadableStream<Uint8Array>
): Readable => {
	const reader = readableStream.getReader()
	return new Readable({
		async read() {
			const { done, value } = await reader.read()
			if (done) {
				this.push(null)
			} else {
				this.push(Buffer.from(value))
			}
		},
	})
}

const toNodeRequest = (req: NextRequest): IncomingMessage => {
	const headers: Record<string, string> = {}
	req.headers.forEach((value, key) => {
		headers[key] = value
	})

	const bodyStream = toNodeReadable(req.body as ReadableStream<Uint8Array>)
	const nodeRequest = Object.assign(bodyStream, {
		headers,
		method: req.method,
		url: req.url,
	}) as IncomingMessage

	return nodeRequest
}

const parseForm = (req: NextRequest): Promise<{ fields: any; files: any }> => {
	return new Promise((resolve, reject) => {
		const form = new multiparty.Form()
		form.parse(toNodeRequest(req), (err, fields, files) => {
			if (err) reject(err)
			else resolve({ fields, files })
		})
	})
}

export async function PUT(req: NextRequest) {
	try {
		const data = await parseForm(req)
		const { files: formFiles, fields } = data
		const { files } = formFiles
		console.log(data)
		if (!files || files.length === 0) {
			return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
		}

		const uploadResults = []
		const imageURLs: string[] = []

		for (const file of files) {
			const fileContent = fs.readFileSync(file.path)
			const uniqueFilename = `${randomUUID()}-${file.originalFilename}`

			const command = new PutObjectCommand({
				Bucket: env.AWS_BUCKET_NAME!,
				Key: uniqueFilename,
				Body: fileContent,
				ContentType: file.headers['content-type'],
			})

			await awsClient.send(command)

			uploadResults.push({
				filename: uniqueFilename,
				originalFilename: file.originalFilename,
			})
			imageURLs.push(uniqueFilename)
		}

		const project = await prisma.project.findUnique({
			where: {
				id: Number(fields.projectId[0]),
			},
		})

		if (!project)
			return NextResponse.json({ error: 'Project not found' }, { status: 400 })

		const allImages = [...imageURLs, ...project.imageURLs]

		console.log(allImages)
		console.log(allImages.length)

		await prisma.project.update({
			where: {
				id: project.id,
			},
			data: {
				imageURLs: allImages,
			},
		})

		return NextResponse.json(
			{
				message: 'Upload concluído com sucesso',
				// files: uploadResults,
				// project: newProject,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
	}
}
