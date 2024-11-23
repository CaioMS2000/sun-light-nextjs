import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface EmailTemplateProps {
  name: string
  email: string
  address: string
  phone: string
  message: string
  phoneUsesWhatsapp: 'yes' | 'no'
}

export default function EmailTemplate({
  name,
  email,
  address,
  phone,
  message,
  phoneUsesWhatsapp,
}: EmailTemplateProps) {
  const doesPhoneUseWhatsapp = phoneUsesWhatsapp === 'yes'
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{name} entrou em contato</CardTitle>
          <CardDescription>email: {email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Enedreço: {address}</p>
          <p>Telefone: {phone}</p>
          <div className="flex flex-col">
            <p>Mensagem:</p>
            <p>{message}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-red-600 italic">
            {doesPhoneUseWhatsapp && 'Esse número de telefone não usa WhatsApp'}
          </p>
        </CardFooter>
      </Card>
    </>
  )
}
