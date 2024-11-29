import { getProjects } from '@/functions/get-projects'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const urlObject = new URL(req.url)
		const { searchParams } = urlObject
		const page = searchParams.get('page')

		if (!page) {
			return NextResponse.json({ error: 'Page not provided' }, { status: 404 })
		}

		const { projects, meta } = await getProjects(+page)

		return NextResponse.json(
			{
				projects,
				meta,
			},
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ error: 'Some error occurred' }, { status: 500 })
	}
}
