'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  message: z.string(),
  phoneUsesWhatsapp: z.enum(['yes', 'no']),
})
export default function SectionForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

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
            <form className="lg:w-[700px] xl:w-[1000px]">
              <fieldset className="flex flex-col gap-3 md:grid md:grid-cols-2">
                <Input
                  placeholder="Nome completo"
                  className="placeholder:text-muted-foreground/50"
                />
                <Input
                  placeholder="Seu email"
                  className="placeholder:text-muted-foreground/50"
                />
                <Input
                  placeholder="Endereço"
                  className="placeholder:text-muted-foreground/50"
                />
                <fieldset>
                  <Input
                    placeholder="Celular"
                    className="placeholder:text-muted-foreground/50"
                  />
                  <RadioGroup defaultValue="yes" className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes"
                        id="yes"
                        className="border-input text-zinc-500"
                      />
                      <Label htmlFor="yes" className="text-accent-100/50">
                        Sim
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        id="no"
                        className="border-input text-zinc-500"
                      />
                      <Label htmlFor="no" className="text-accent-100/50">
                        Não
                      </Label>
                    </div>
                  </RadioGroup>
                </fieldset>
              </fieldset>
              <fieldset>
                <Label className="text-zinc-500">
                  Mensagem <Textarea className="mt-3" />
                </Label>
              </fieldset>
              <Button
                type="submit"
                className="mt-4 w-fit rounded-full bg-accent-100 px-5"
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
