'use client'
import NavHeader from '@/components/nav-header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function MobileHomeHeader() {
	const router = useRouter()

	async function handleClick() {
		await router.push('/projects')
	}

	return (
		<>
			<header className="relative h-[450px] w-screen md:hidden">
				<NavHeader className="absolute w-screen bg-light-grey/60" />
				<div className='flex h-full w-full items-end bg-[url("/images/banners/IMG_8447.png")] bg-cover'>
					<div className="h-fit w-full space-y-5 bg-accent-100 py-5 pl-7 text-white">
						<h3 className="text-2xl">Redefinindo Energia</h3>
						<p className="max-w-56 text-wrap text-xs">
							Somos especialistas em eficiência energética, fornecendo soluções
							concretas e personalizadas para atender às suas necessidades.
						</p>
						<Button
							className="bg-white text-accent-100 text-xs hover:text-white"
							onClick={handleClick}
						>
							Nossos projetos
						</Button>
					</div>
				</div>
			</header>
		</>
	)
}
