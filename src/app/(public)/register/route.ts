import { register } from '@/functions/register'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  password: z.string(),
  username: z.string(),
  name: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, username, name } = bodySchema.parse(body)

    if (!username || !password) {
      return NextResponse.json('Missing username or password', {
        status: 400,
      })
    }

    const { newUser } = await register({ password, username, name })

    return NextResponse.redirect(
      new URL(`/sign-in?username=${newUser.username}`, request.url),
      303
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 400,
      })
    }

    return NextResponse.json(error, {
      status: 400,
    })
  }
}
