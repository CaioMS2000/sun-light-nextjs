'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import emailjs from '@emailjs/browser'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  message: z.string(),
  phoneUsesWhatsapp: z.enum(['yes', 'no']),
})
type FormData = z.infer<typeof formSchema>

const emailEnvSchema = z.object({
  NEXT_PUBLIC_RESEND_API_KEY: z.string().min(1),
})
const envParse = emailEnvSchema.safeParse({
  NEXT_PUBLIC_RESEND_API_KEY: process.env.NEXT_PUBLIC_RESEND_API_KEY,
})
const emailDeliveryKey = envParse.data

export default function SectionForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'text name',
      email: 'email@email.com',
      address: 'address 1',
      phone: '99999999999',
      message: 'test message',
      phoneUsesWhatsapp: 'yes',
    },
  })

  async function handleSubmitFn(data: FormData) {
    if (!emailDeliveryKey) {
      throw new Error('Email delivery key not found')
    }

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
          message: data.message,
          phoneUsesWhatsapp: data.phoneUsesWhatsapp,
        }),
      })

      reset()
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <>
      <div className="min-h-[270px] px-5 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-around">
          <div className="flex flex-col gap-3 md:gap-16">
            <div className="w-52">
              <p className="font-semibold text-lg">Endereço</p>
              <p className="text-sm">
                R. Monte Castelo, Qd. 14, Lt. 01, Número 477, Jardim Planalto,
                Goiânia-GO
              </p>
            </div>
            <div className="">
              <p className="font-semibold text-lg">Horário de funcionamento</p>
              <p className="text-sm">Dias de semana: 08:00 às 18:00</p>
              <p className="text-sm">
                Finais de semana:{' '}
                <span className="text-black/40 italic">fechado</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="mt-10 mb-3 font-semibold">Envie um email</h4>
            <form
              className="lg:w-[700px] xl:w-[1000px]"
              onSubmit={handleSubmit(handleSubmitFn)}
            >
              <fieldset className="flex flex-col gap-3 md:grid md:grid-cols-2">
                <Input
                  {...register('name')}
                  placeholder="Nome completo"
                  className="placeholder:text-muted-foreground/50"
                />
                <Input
                  {...register('email')}
                  placeholder="Seu email"
                  className="placeholder:text-muted-foreground/50"
                />
                <Input
                  {...register('address')}
                  placeholder="Endereço"
                  className="placeholder:text-muted-foreground/50"
                />
                <fieldset>
                  <Input
                    {...register('phone')}
                    placeholder="Celular"
                    className="placeholder:text-muted-foreground/50"
                  />
                  <Controller
                    control={control}
                    name="phoneUsesWhatsapp"
                    render={({ field }) => (
                      <Label>
                        <span className="mr-2 text-xs text-zinc-400">
                          Este número usa WhatsApp
                        </span>
                        <RadioGroup
                          defaultValue="yes"
                          className="inline-flex"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="yes"
                              id="yes"
                              className="border-input text-zinc-500"
                            />
                            <Label
                              htmlFor="yes"
                              className="text-accent-100/50 text-xs"
                            >
                              Sim
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="no"
                              id="no"
                              className="border-input text-zinc-500"
                            />
                            <Label
                              htmlFor="no"
                              className="text-accent-100/50 text-xs"
                            >
                              Não
                            </Label>
                          </div>
                        </RadioGroup>
                      </Label>
                    )}
                  />
                </fieldset>
              </fieldset>
              <fieldset>
                <Label className="text-zinc-500">
                  Mensagem{' '}
                  <Textarea {...register('message')} className="mt-3" />
                </Label>
              </fieldset>
              <Button
                type="submit"
                className="mt-4 w-fit rounded-full bg-accent-100 px-5"
                disabled={isSubmitting}
              >
                Enviar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
