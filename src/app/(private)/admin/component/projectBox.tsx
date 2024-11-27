'use client'
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
	return (
		<>
			<Card className="mx-auto w-96 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] md:w-[700px] lg:w-[700px]">
				<CardHeader>
					<CardTitle>{name}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Endereço: {address}</p>
					<p>Potência: {potency} kWp</p>
					<p>Produção estimada: {estimation} kWh/mês</p>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Carousel
						opts={{
							align: 'start',
							loop: true,
						}}
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
											className="h-20 w-auto rounded-lg"
										/>
									</CarouselItem>
								)
							})}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</CardFooter>
			</Card>
		</>
	)
}
