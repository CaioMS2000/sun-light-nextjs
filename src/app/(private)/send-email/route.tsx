import EmailTemplate from '@/components/email-template'
import { env } from '@/env'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  message: z.string(),
  phoneUsesWhatsapp: z.enum(['yes', 'no']),
})
const resend = new Resend(env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, address, phone, message, phoneUsesWhatsapp } =
      formSchema.parse(body)
    const { data, error } = await resend.emails.send({
      //   from: 'Acme <onboarding@resend.dev>',
      from: 'admin@sunlighteng.com.br',
      to: ['admin@sunlighteng.com.br'],
      subject: `Contato de ${name}`,
      react: EmailTemplate({
        name: name,
        email: email,
        address: address,
        phone: phone,
        message: message,
        phoneUsesWhatsapp: phoneUsesWhatsapp,
      }),
    })

    if (error) {
      console.log('\n\n')
      console.error(error)
      console.log('\n\n')
      return NextResponse.json(
        { error: 'Envio de email falhou' },
        { status: 500 }
      )
    }

    console.log(data)

    return NextResponse.json(
      {
        message: 'Email enviado com sucesso',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Envio de email falhou' },
      { status: 500 }
    )
  }
}
