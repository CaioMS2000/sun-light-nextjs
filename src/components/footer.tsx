import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export default function Footer({ className, ...props }: FooterProps) {
  return (
    <>
      <div
        {...props}
        className={cn(
          'bg-accent-100 pt-16 pb-5 text-white md:grid md:grid-cols-4 md:items-start md:gap-y-10',
          className
        )}
      >
        <div className="flex flex-col gap-2 pl-10">
          <p>Páginas</p>
          <Link href={'/'}>Página inicial</Link>
          <Link href={'/about-us'}>Sobre nós</Link>
          <Link href={'/solar-energy'}>Energia Solar</Link>
          <Link href={'/projects'}>Projetos</Link>
          <Link href={'/contact'}>Contato</Link>
        </div>
        <div className="mt-10 flex flex-col gap-2 pl-10 md:mt-0">
          <p>Redes sociais</p>
          <Link
            target="_blank"
            href={'https://www.instagram.com/sunlightengenhariadosol/'}
          >
            Instagram
          </Link>
        </div>
        <div className="mt-10 flex flex-col gap-2 pl-10 md:mt-0">
          <p>Legal</p>
          <Link href={'/'}>Privacy and Cookies Policy</Link>
          <Link href={'/'}>Termos e Condições</Link>
        </div>
        <Image
          src={'/images/iso certifications.png'}
          alt=""
          width="0"
          height="0"
          sizes="500px"
          className="mx-auto mt-5 w-64 md:mt-0 xl:w-96"
        />

        <div className="mt-5 space-y-3 text-center text-white md:mt-0">
          <p>© 2024 Todos os direitos reservados.</p>
          <p className="inline-flex gap-2">
            <span>Sun Light</span> <span>|</span>
            <span>
              <Link
                target="_blank"
                href={'https://www.linkedin.com/in/caio-m-silva/'}
              >
                Caio M. Silva
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
