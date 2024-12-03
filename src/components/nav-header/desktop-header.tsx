import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import IconComponent from './icon-component'

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
	console.log(className)
	console.log(className?.includes('bg-accent'))
	const bgIsDark = className?.includes('bg-accent')
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
					<IconComponent className={className} />
				</Link>
				<div className="flex items-center gap-6 text-lg">
					<Link href={'/'} className="hover:text-sun-light-yellow">
						Página inicial
					</Link>
					<Link href={'/about-us'} className="hover:text-sun-light-yellow">
						Sobre nós
					</Link>
					<Link href={'/solar-energy'} className="hover:text-sun-light-yellow">
						Energia Solar
					</Link>
					<Link href={'/projects'} className="hover:text-sun-light-yellow">
						Projetos
					</Link>
					<Link
						href={'/contact'}
						className={cn(
							'rounded-full px-5 py-2 text-white hover:text-sun-light-yellow',
							{
								'bg-accent-100': contactButton.color === 'dark',
								'bg-dark-grey': contactButton.color === 'light',
								'bg-opacity-30': contactButton.background === 'semi-transparent',
								'bg-opacity-100': contactButton.background === 'solid',
							}
						)}
					>
						Contato
					</Link>
				</div>
			</nav>
		</>
	)
}
