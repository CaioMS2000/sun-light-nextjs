'use client'
import Autoplay from 'embla-carousel-autoplay'
import { ProcessedProject } from '@/@types/project'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { type CarouselApi } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectBoxProps extends ProcessedProject {}

export default function ProjectBox({
	id,
	name,
	address,
	potency,
	estimation,
	pj,
	images,
}: ProjectBoxProps) {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])
	return (
		<>
			<Card className="mx-auto w-96 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] md:w-[700px] lg:w-[700px]">
				<CardHeader>
					<CardTitle className="flex flex-col text-sm md:text-lg">
						<span className="span">{name}</span>
						<span className="span">{address}</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col px-5 md:flex-row md:gap-28">
					<p>
						<strong>Potência:</strong> {potency} kWp
					</p>
					<p>
						<strong>Produção estimada:</strong> {estimation} kWh/mês
					</p>
				</CardContent>
				<CardFooter className="flex flex-col justify-center gap-3">
					<Carousel
						opts={{
							align: 'start',
							loop: true,
						}}
						plugins={[
							Autoplay({
								delay: 2000,
							}),
						]}
						setApi={setApi}
						className="w-full"
					>
						<CarouselContent className="-ml-2 md:-ml-4">
							{images.map((image, i) => {
								const key = `image-${i}`
								return (
									<CarouselItem key={key} className="w-fit basis-auto pl-1">
										<Image
											alt=""
											src={image}
											width="0"
											height="0"
											sizes="500px"
											className=" w-auto rounded-lg"
										/>
									</CarouselItem>
								)
							})}
						</CarouselContent>
					</Carousel>
					<div className="flex gap-5">
						<Button
							type="button"
							onClick={() => api?.scrollTo(current - 1)}
							className="bg-sun-light-blue"
						>
							<ChevronLeft />
						</Button>
						<Button
							type="button"
							onClick={() => api?.scrollTo(current + 1)}
							className="bg-sun-light-blue"
						>
							<ChevronRight />
						</Button>
					</div>
				</CardFooter>
			</Card>
		</>
	)
}
