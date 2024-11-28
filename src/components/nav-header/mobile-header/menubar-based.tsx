'use client'
import { cn } from '@/lib/utils'
import { AlignJustify, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from '../../ui/menubar'

interface ContactButtonProps {
	background?: 'semi-transparent' | 'solid'
	color?: 'dark' | 'light'
}

interface NavHeaderProps extends React.HTMLAttributes<HTMLElement> {
	contactButton?: ContactButtonProps
}

export default function MobileNavHeader2({
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
			<nav {...props} className={cn('md:hidden', className)}>
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
					<Menubar className="border-0 bg-transparent" onClick={handleClick}>
						<MenubarMenu>
							<MenubarTrigger className="border-2 border-accent-100">
								{isMenuOpen && <XIcon />}
								{!isMenuOpen && <AlignJustify />}
							</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									<Link className="underline underline-offset-2" href={'/'}>
										Página inicial
									</Link>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									<Link className="underline underline-offset-2" href={'/about-us'}>
										Sobre nós
									</Link>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									<Link className="underline underline-offset-2" href={'/solar-energy'}>
										Energia Solar
									</Link>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									<Link className="underline underline-offset-2" href={'/projects'}>
										Projetos
									</Link>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									<Link className="underline underline-offset-2" href={'/contact'}>
										Contato
									</Link>
								</MenubarItem>
								<MenubarItem>
									<Link
										className="text-zinc-400 underline underline-offset-2"
										href={'/admin'}
									>
										Administrador
									</Link>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>
			</nav>
		</>
	)
}
