'use client'
import NavHeader from '@/components/nav-header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DesktopHomeHeader() {
	const router = useRouter()

	async function handleClick() {
		await router.push('/projects')
	}

	return (
		<>
			<header className="relative hidden h-[400px] w-screen md:flex">
				<NavHeader className="absolute w-screen text-white" />
				<div className="flex h-full max-w-[410px] items-end bg-accent-100 pb-8 text-white">
					<div className="space-y-10 pl-14">
						<h3 className="text-4xl">Redefinindo Energia</h3>
						<p className="max-w-80 text-wrap text-xs">
							Somos especialistas em eficiência energética, fornecendo soluções
							concretas e personalizadas para atender às suas necessidades.
						</p>
						<Button
							className="bg-white text-accent-100 hover:text-white"
							onClick={handleClick}
						>
							Nossos projetos
						</Button>
					</div>
				</div>
				<div className='flex h-full w-[60%] flex-1 items-end bg-[url("/images/banners/IMG_8447.png")] bg-cover xl:bg-[position:0%_10%] 2xl:bg-[position:0%_20%]'></div>
			</header>
		</>
	)
}
