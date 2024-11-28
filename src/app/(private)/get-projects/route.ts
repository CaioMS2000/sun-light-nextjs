import { getProjects } from '@/functions/get-projects'
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { Readable } from 'node:stream'
import { ProcessedProject } from '@/@types/project'

const client = new S3Client({
	endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: 'auto',
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
	},
})

// Função para converter um Readable (Node.js) em uma string base64 já formatada
async function getBase64ImageFromS3(body: Readable, mimeType: string) {
	const chunks: Buffer[] = []

	for await (const chunk of body) {
		chunks.push(Buffer.from(chunk))
	}

	const buffer = Buffer.concat(chunks)
	return `data:${mimeType};base64,${buffer.toString('base64')}`
}

export async function GET(req: NextRequest) {
	try {
		const urlObject = new URL(req.url)
		console.log(urlObject)
		const { searchParams } = urlObject
		const page = searchParams.get('page')

		if (!page) {
			return NextResponse.json({ error: 'Page not provided' }, { status: 404 })
		}

		const { projects: allProjects, meta } = await getProjects(+page)
		const processedProjects: ProcessedProject[] = []

		for (const project of allProjects) {
			const base64Images = []
			for (const imageURL of project.imageURLs) {
				const command = new GetObjectCommand({
					Bucket: env.AWS_BUCKET_NAME,
					Key: imageURL,
				})
				const response = await client.send(command)

				if (!response.Body) {
					return NextResponse.json({ error: 'File not found' }, { status: 404 })
				}

				const mimeType = response.ContentType

				if (!mimeType) {
					return NextResponse.json(
						{ error: 'Content type not found' },
						{ status: 404 }
					)
				}

				const base64Image = await getBase64ImageFromS3(
					response.Body as Readable,
					mimeType
				)

				base64Images.push(base64Image)
			}

			processedProjects.push({
				id: project.id,
				name: project.name,
				address: project.address,
				potency: project.potency,
				estimation: project.estimation,
				pj: project.pj,
				images: base64Images,
			})
		}

		return NextResponse.json(
			{
				projects: processedProjects,
				meta,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Some error occurred' }, { status: 500 })
	}
}
