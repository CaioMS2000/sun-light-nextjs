'use client'
import Autoplay from 'embla-carousel-autoplay'
import { Project } from '@/@types/project'
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
} from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	BatteryCharging,
	ChartNoAxesCombined,
	ChevronLeft,
	ChevronRight,
	CircleUser,
	ImageIcon,
	MapPinHouse,
} from 'lucide-react'
import { SUBDOMAINBUCKETURL } from '@/constants/cloud'
import ImageComponent from './image-component'

interface ProjectBoxProps extends Project {}

export default function ProjectBox({
	id,
	name,
	address,
	potency,
	estimation,
	pj,
	imageURLs,
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
						<span className="inline-flex items-center gap-3">
							<CircleUser />
							{name}
						</span>
						<span className="inline-flex items-center gap-3">
							<MapPinHouse />
							{address}
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col px-5 md:flex-row md:gap-14">
					<p className="inline-flex items-center gap-3">
						<BatteryCharging />
						<span>
							<strong>Potência:</strong> {potency} kWp
						</span>
					</p>
					<p className="inline-flex items-center gap-3">
						<ChartNoAxesCombined />
						<span>
							<strong>Produção estimada:</strong> {estimation} kWh/mês
						</span>
					</p>
					<p className="inline-flex items-center gap-3">
						<ImageIcon />
						<span>
							<strong>{count}</strong>
						</span>
					</p>
				</CardContent>
				<CardFooter className="flex flex-col justify-center gap-3">
					<Carousel
						opts={{
							align: 'center',
							loop: true,
						}}
						plugins={[
							Autoplay({
								delay: 1000 * 5,
							}),
						]}
						setApi={setApi}
						className="w-full"
					>
						<CarouselContent>
							{imageURLs.map((url, i) => {
								const key = `image-${i}`
								return (
									<CarouselItem key={key} className="flex justify-center">
										<ImageComponent
											alt=""
											src={`${SUBDOMAINBUCKETURL}/${url}`}
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
					<div className="flex flex-col items-center justify-between gap-5">
						<p className="text-center">
							{current} de {count}
						</p>
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
					</div>
				</CardFooter>
			</Card>
		</>
	)
}
