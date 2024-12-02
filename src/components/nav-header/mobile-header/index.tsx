'use client'
import { cn } from '@/lib/utils'
import { AlignJustify, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ContactButtonProps {
	background?: 'semi-transparent' | 'solid'
	color?: 'dark' | 'light'
}

interface NavHeaderProps extends React.HTMLAttributes<HTMLElement> {
	contactButton?: ContactButtonProps
}

export default function MobileNavHeader({
	contactButton = { background: 'solid', color: 'dark' },
	className,
	...props
}: NavHeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	function handleClick() {
		setIsMenuOpen(prevState => !prevState)
	}

	return (
		<>
			<nav {...props} className={cn('flex flex-col md:hidden', className)}>
				<div className="flex items-center justify-between px-5 pt-3">
					<Link href={'/'}>
						<div className="grid grid-cols-[auto,1fr] gap-2">
							<Image
								src={'/images/logo_icon_alpha_sm.png'}
								width={50}
								height={50}
								alt=""
							/>
							<div className="flex flex-col justify-center">
								<p className="font-semibold text-sun-light-blue">Sun Light</p>
								<p className="text-dark-grey">Engenharia do Sol</p>
							</div>
						</div>
					</Link>

					<button
						type="button"
						className="h-fit border-2 border-accent-100 p-1"
						onClick={handleClick}
					>
						{isMenuOpen && <XIcon />}
						{!isMenuOpen && <AlignJustify />}
					</button>
				</div>

				{isMenuOpen && (
					<div className="mt-4 flex flex-col gap-4 py-3 pl-5 text-lg">
						<Link
							className="underline underline-offset-2 focus:text-sun-light-yellow"
							href={'/'}
						>
							Página inicial
						</Link>
						<Link
							className="underline underline-offset-2 focus:text-sun-light-yellow"
							href={'/about-us'}
						>
							Sobre nós
						</Link>
						<Link
							className="underline underline-offset-2 focus:text-sun-light-yellow"
							href={'/solar-energy'}
						>
							Energia Solar
						</Link>
						<Link
							className="underline underline-offset-2 focus:text-sun-light-yellow"
							href={'/projects'}
						>
							Projetos
						</Link>
						<Link
							className="underline underline-offset-2 focus:text-sun-light-yellow"
							href={'/contact'}
						>
							Contato
						</Link>
						<Link
							className="underline underline-offset-2 focus:text-sun-light-yellow"
							href={'/admin'}
						>
							Administrador
						</Link>
					</div>
				)}
			</nav>
		</>
	)
}
