import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'
import multiparty from 'multiparty'
import { Readable } from 'node:stream'
import { IncomingMessage } from 'node:http'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from '@/env'

const client = new S3Client({
	endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: 'auto',
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
	},
})

export const config = {
	api: {
		bodyParser: false,
	},
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

export async function POST(req: NextRequest) {
	try {
		const data = await parseForm(req)
		const { files: formFiles, ...rest } = data
		const { files } = formFiles
		console.log('\n\n\n\n\n')
		console.log(Object.keys(data))
		console.log(data)
		console.log(formFiles)
		console.log(files)
		console.log(Object.keys(rest))
		console.log(rest)

		if (!files || files.length === 0) {
			return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
		}

		const uploadResults = []

		for (const file of files) {
			const fileContent = fs.readFileSync(file.path)
			const uniqueFilename = `${randomUUID()}-${file.originalFilename}`

			// const command = new PutObjectCommand({
			//   Bucket: env.AWS_BUCKET_NAME!,
			//   Key: uniqueFilename,
			//   Body: fileContent,
			//   ContentType: file.headers['content-type'],
			// })

			// await client.send(command)

			uploadResults.push({
				filename: uniqueFilename,
				originalFilename: file.originalFilename,
			})
		}

		return NextResponse.json(
			{
				message: 'Upload concluído com sucesso',
				files: uploadResults,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
	}
}
