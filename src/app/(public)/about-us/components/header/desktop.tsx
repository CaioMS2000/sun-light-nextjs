import NavHeader from '@/components/nav-header'
import { NotebookText } from 'lucide-react'

export default function DesktopHeader() {
	return (
		<>
			<header className='relative hidden h-[400px] w-screen bg-[position:0%_70%] bg-[url("/images/banners/IMG-20241202-WA0034.jpg")] bg-cover md:flex md:bg-[position:80%_50%] md:bg-auto'>
				<NavHeader className="absolute w-screen bg-black/60 text-white" />
				<div className="flex h-full w-full items-end">
					<h3 className="inline-flex w-full items-center gap-2 bg-accent-100 p-4 text-3xl text-white">
						<NotebookText className="size-10" />
						<strong>Sobre nós</strong>
					</h3>
				</div>
			</header>
		</>
	)
}
