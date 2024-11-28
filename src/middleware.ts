import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { env } from './env'
import { USERNAME_COOKIE } from './constants/cookies'

export async function middleware(request: NextRequest) {
	const cookieStore = await cookies()
	const usernameCookie = cookieStore.get(USERNAME_COOKIE)

	if (env.SECURITY_MIDDLEWARE_ENABLED === 'true')
		if (!usernameCookie)
			return NextResponse.redirect(new URL('/sign-in', request.url), {
				status: 303,
			})
}

export const config = {
	matcher: ['/admin'],
}
