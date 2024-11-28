import { ProcessedProject } from '@/@types/project'
import ProjectBox from './projectBox'
import { Hotel } from 'lucide-react'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { env } from '@/env'
import { getProjects } from '@/functions/get-projects'
import { Readable } from 'node:stream'

export default async function ProjectsArea() {
	const client = new S3Client({
		endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		region: 'auto',
		credentials: {
			accessKeyId: env.AWS_ACCESS_KEY_ID!,
			secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
		},
	})

	async function getBase64ImageFromS3(body: Readable, mimeType: string) {
		const chunks: Buffer[] = []

		for await (const chunk of body) {
			chunks.push(Buffer.from(chunk))
		}

		const buffer = Buffer.concat(chunks)
		return `data:${mimeType};base64,${buffer.toString('base64')}`
	}

	const allProjects = await getProjects()
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
				throw new Error('File not found')
			}

			const mimeType = response.ContentType

			if (!mimeType) {
				throw new Error('Content type not found')
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

	return (
		<>
			<h3 className="my-10 ml-2 inline-flex items-center gap-2 font-bold text-2xl">
				<Hotel />
				Projetos
			</h3>
			<div className="flex flex-col gap-6">
				{processedProjects.map((project: ProcessedProject) => (
					<ProjectBox key={project.id} {...project} />
				))}
			</div>
		</>
	)
}
