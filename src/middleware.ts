import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { env } from './env'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const usernameCookie = cookieStore.get('@sunlight-admin:username')

  // if (!usernameCookie && env.SECURITY_MIDDLEWARE_ENABLED)
  //   return NextResponse.redirect(new URL('/', request.url))

  //   return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/',
}
