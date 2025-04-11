import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterParams {
	password: string
	username: string
	name: string
}

export async function register({ password, username, name }: RegisterParams) {
	const restrictionOptions = env.NEXT_PUBLIC_USER_RESTRICTIONS.split(',')

	if (
		restrictionOptions.length > 0 &&
		!restrictionOptions.includes(name.toLocaleLowerCase())
	)
		throw new Error('You are not allowed to register')

	const userWithSameUsername = await prisma.user.findUnique({
		where: {
			username,
		},
	})

	if (userWithSameUsername) throw new Error('User already exists')

	const passwordHash = await hash(password, 6)
	const newUser = await prisma.user.create({
		data: {
			username,
			passwordHash,
			name,
		},
	})

	return { newUser }
}
