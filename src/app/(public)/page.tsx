import { ArrowRight } from 'lucide-react'
import HomeHeader from './components/home-header'
import Image from 'next/image'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<>
			<HomeHeader />
			<div className="pl-10 md:pl-24">
				<h3 className="mt-28 mb-10 text-2xl">Áreas de atuação</h3>
				<p className="mb-10 max-w-[700px] text-wrap">
					Seja para projetos de pequena ou grande escala, estamos comprometidos em
					entregar resultados de ponta, contribuindo para um futuro energético mais
					sustentável e inovador.
				</p>
			</div>
			<div className="grid w-full grid-cols-2 place-items-center gap-2 px-2 md:grid-cols-3 md:gap-4">
				<div className='flex h-64 w-full items-end rounded-lg bg-[url("/images/services/anna-jimenez-calaf-PLOq7Ouq0fM-unsplash.jpg")] bg-cover pb-7 pl-7 text-lg text-white md:h-96'>
					Soluções em energias renováveis
				</div>

				<div className='flex h-64 w-full items-end rounded-lg bg-[url("/images/services/carlos-muza-hpjSkU2UYSU-unsplash.jpg")] bg-cover pb-7 pl-7 text-lg text-white md:h-96'>
					Laudos técnicos
				</div>

				<div className='flex h-64 w-full items-end rounded-lg bg-[url("/images/services/christopher-burns-Wiu3w-99tNg-unsplash.jpg")] bg-cover pb-7 pl-7 text-lg text-white md:h-96'>
					Projetos estruturais
				</div>

				<div className='flex h-64 w-full items-end rounded-lg bg-[url("/images/services/les-dehamer-GCyNrD_HMls-unsplash.jpg")] bg-cover pb-7 pl-7 text-lg text-white md:h-96'>
					Projetos complementares
				</div>

				<div className='flex h-64 w-full items-end rounded-lg bg-[url("/images/services/ryan-ancill-0w1MiTY78h0-unsplash.jpg")] bg-cover pb-7 pl-7 text-lg text-white md:h-96'>
					Projetos de arquitetura
				</div>
				<Link
					href={'/projects'}
					className="flex h-64 w-full flex-col items-center justify-center gap-3 bg-accent-100 bg-cover font-bold text-lg text-white md:h-96"
				>
					<p className="">Nossos projetos</p>
					<ArrowRight />
				</Link>
			</div>
			<div className="mt-10 flex w-full justify-start pl-2 md:mt-28 md:justify-end">
				<p className="max-w-80 text-xs md:max-w-3xl md:text-base">
					Somos especialistas em energia fotovoltaica. Com um compromisso inabalável
					com a inovação, oferecemos soluções personalizadas para projetos de todos
					os tamanhos. Nossa equipe dedicada trabalha incansavelmente para entregar
					os melhores sistemas de energia solar, garantindo máxima eficiência e
					economia para nossos clientes. Estamos comprometidos em moldar um futuro
					energético mais sustentável através da energia solar.{' '}
				</p>
			</div>
			<div className="mt-40 flex items-center justify-around bg-light-grey md:mt-60 md:px-5">
				<Image
					src={'/images/banners/raphael-cruz-IwY-27ceRCA-unsplash.jpg'}
					alt=""
					width="0"
					height="0"
					sizes="500px"
					className="-translate-y-10 hidden w-64 rounded-lg md:block xl:w-96"
				/>

				<Card className="h-fit border-none bg-transparent shadow-transparent">
					<CardHeader>
						<CardTitle className="text-base">Conhecimento profundo na área</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm">
							Nossa extensa experiência e profunda expertise no setor de energia solar
							nos posicionaram como referência no mercado. Com anos de atuação
							especializada, aperfeiçoamos nosso conhecimento em sistemas fotovoltaicos
							e eficiência energética solar a um nível que nos diferencia. O profundo
							entendimento de nossa equipe neste segmento nos permite fornecer soluções
							inovadoras e personalizadas que não apenas atendem, mas superam as
							expectativas de nossos clientes na implementação de energia solar.{' '}
						</p>
					</CardContent>
					<CardFooter className="text-sm">
						<Button type="button" variant={'outline'}>
							<Link href={'/about'} className="inline-flex items-center gap-3">
								Saiba mais <ArrowRight size={20} />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>

			<Card className="mt-40 mb-16 h-fit border-none bg-transparent shadow-transparent">
				<CardHeader>
					<CardTitle className="text-base md:text-xl">
						Entre em contato conosco
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="max-w-[600px] text-sm">
						Se você está pronto para explorar como nossa experiência em energia solar
						pode beneficiar seus projetos, não hesite em nos contatar. Estamos aqui
						para ouvir, colaborar e fornecer soluções personalizadas que se alinhem
						com suas necessidades e objetivos específicos.
					</p>
				</CardContent>
				<CardFooter className="text-sm">
					<Button type="button" variant={'outline'}>
						<Link href={'/contact'} className="inline-flex items-center gap-3">
							Entre em contato <ArrowRight size={20} />
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</>
	)
}
