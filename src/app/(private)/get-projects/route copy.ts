import { getProjects } from '@/functions/get-projects'
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { Readable } from 'node:stream'

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
		const command = new GetObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: '0e19ef4a-d503-4b2e-af05-b6e5cbdff969-1056.png',
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

		return NextResponse.json(
			{
				projects: await getProjects(),
				image: base64Image,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Some error occurred' }, { status: 500 })
	}
}
