import NavHeader from '@/components/nav-header'
import QuoteButton from '../quote-butto'

export default function DesktopHeader() {
	return (
		<>
			<header className='relative hidden h-[400px] w-screen bg-[url("/images/banners/IMG-20241202-WA0030.jpg")] bg-cover md:flex'>
				<NavHeader className="absolute w-screen text-white" />
				<div className="flex h-full items-end bg-accent-100/80 pr-3 pb-8 text-white">
					<div className="space-y-10 pl-14">
						<h3 className="text-2xl">Você ainda paga pela sua energia elétrica?</h3>
						<p className="max-w-56 text-wrap text-xs">
							Se você quer deixar de ser um <strong>comprador</strong> e se tornar um{' '}
							<strong>gerador</strong> da sua própria energia elétrica. Solicite um
							orçamento conosco clicando no botão abaixo.
						</p>
						<QuoteButton />
					</div>
				</div>
			</header>
		</>
	)
}
