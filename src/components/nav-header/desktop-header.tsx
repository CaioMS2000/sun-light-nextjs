import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ContactButtonProps {
  background?: 'semi-transparent' | 'solid'
  color?: 'dark' | 'light'
}

interface NavHeaderProps extends React.HTMLAttributes<HTMLElement> {
  contactButton?: ContactButtonProps
}

export default function DesktopNavHeader({
  contactButton = { background: 'solid', color: 'dark' },
  className,
  ...props
}: NavHeaderProps) {
  return (
    <>
      <nav
        {...props}
        className={cn(
          'hidden items-center justify-between px-6 py-3 md:flex',
          className
        )}
      >
        <Link href={'/'}>
          <div className="grid grid-cols-[auto,1fr] gap-2">
            <Image
              src={'/images/logo_icon_alpha_sm.png'}
              alt=""
              // width={50}
              // height={50}
              width="0"
              height="0"
              sizes="100px"
              className="w-12 lg:w-16"
            />
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-sun-light-blue">Sun Light</p>
              <p className="text-dark-grey">Engenharia do Sol</p>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-6 text-lg">
          <Link href={'/'}>Página inicial</Link>
          <Link href={'/about-us'}>Sobre nós</Link>
          <Link href={'/solar-energy'}>Energia Solar</Link>
          <Link href={'/projects'}>Projetos</Link>
          <Link
            href={'/contact'}
            className={cn('rounded-full px-5 py-2 text-white', {
              'bg-accent-100': contactButton.color === 'dark',
              'bg-dark-grey': contactButton.color === 'light',
              'bg-opacity-30': contactButton.background === 'semi-transparent',
              'bg-opacity-100': contactButton.background === 'solid',
            })}
          >
            Contato
          </Link>
        </div>
      </nav>
    </>
  )
}
