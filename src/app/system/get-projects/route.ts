import { getProjects } from '@/functions/get-projects'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const urlObject = new URL(req.url)
		const { searchParams } = urlObject
		const page = searchParams.get('page')
		const order = searchParams.get('order')

		if (!page) {
			return NextResponse.json({ error: 'Page not provided' }, { status: 404 })
		}

		const { projects, meta } = await getProjects({ page: Number(page), order })

		return NextResponse.json(
			{
				projects,
				meta,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Some error occurred' }, { status: 500 })
	}
}
