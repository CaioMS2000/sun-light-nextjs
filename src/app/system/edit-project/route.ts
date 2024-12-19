import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest) {
	try {
		const { id, name, address, potency, estimation } = await request.json()
		const pre = {
			address,
			estimation: Number(estimation),
			name,
			potency: Number(potency),
		}
		const updated = await prisma.project.update({
			where: {
				id: Number(id),
			},
			data: { ...pre },
		})

		revalidatePath('/projects')
		revalidatePath('/admin')

		return NextResponse.json(
			{
				message: 'Editado com sucesso',
			},
			{ status: 200 }
		)
	} catch (error) {
		// @ts-ignore
		console.log(error.stack)
		console.log('\n\n\n\n')
		console.log(error)
		return NextResponse.json({ error: 'Edição falhou' }, { status: 500 })
	}
}
