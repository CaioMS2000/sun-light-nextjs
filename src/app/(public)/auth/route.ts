import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { authenticate } from '@/functions/authenticate'
import { NAME_COOKIE, USERNAME_COOKIE } from '@/constants/cookies'

const bodySchema = z.object({
	password: z.string(),
	username: z.string(),
})

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { password, username } = bodySchema.parse(body)

		if (!username || !password) {
			return NextResponse.json('Missing username or password', {
				status: 400,
			})
		}

		const { user } = await authenticate({ password, username })
		console.log(user)
		const cookieStore = await cookies()

		cookieStore.set({
			name: USERNAME_COOKIE,
			value: username,
			maxAge: 60 * 60 * 24 * 7, // 7 days
			path: '/',
		})

		cookieStore.set({
			name: NAME_COOKIE,
			value: user.name,
			maxAge: 60 * 60 * 24 * 7, // 7 days
			path: '/',
		})

		return NextResponse.redirect(new URL('/admin', request.url), 303)
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(error.message, {
				status: 400,
			})
		}

		throw error
	}
}
