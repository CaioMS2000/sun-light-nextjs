import { Readable } from 'node:stream'

export async function getBase64ImageFromS3(body: Readable, mimeType: string) {
	const chunks: Buffer[] = []

	for await (const chunk of body) {
		chunks.push(Buffer.from(chunk))
	}

	const buffer = Buffer.concat(chunks)
	return `data:${mimeType};base64,${buffer.toString('base64')}`
}
