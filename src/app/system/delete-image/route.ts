import { env } from '@/env'
import { deleteImage } from '@/functions/delete-image'
import { awsClient } from '@/lib/aws'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
	try {
		const data = await req.json()
		console.log(data)

		await deleteImage(data.image, Number(data.projectId))

		const delCommand = new DeleteObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: data.image,
		})

		const res = await awsClient.send(delCommand)

		console.log(res)
		return NextResponse.json({}, { status: 200 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Error deleting' }, { status: 500 })
	}
}
