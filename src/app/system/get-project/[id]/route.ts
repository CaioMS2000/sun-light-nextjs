import { getProject } from '@/functions/get-project'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
	params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
	try {
		const _params = await params
		const { id } = _params
		const urlObject = new URL(req.url)
		const { project } = await getProject(+id)

		console.log(id)

		return NextResponse.json(
			{
				project,
			},
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ error: 'Some error occurred' }, { status: 500 })
	}
}
