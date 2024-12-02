'use client'
import { Project } from '@/@types/project'

import {
	BatteryCharging,
	ChartNoAxesCombined,
	CircleUser,
	ImageIcon,
	MapPinHouse,
	Pencil,
} from 'lucide-react'
import { SUBDOMAINBUCKETURL } from '@/constants/cloud'
import ImageComponent from './image-component'
import Slider from './slider'
import Link from 'next/link'
import EditProjectButton from './edit-project-button'

interface ProjectBoxProps extends Project {
	isAdmin?: boolean
}

export default function ProjectBox({
	id,
	name,
	address,
	potency,
	estimation,
	imageURLs,
	isAdmin,
}: ProjectBoxProps) {
	return (
		<>
			<div className="mx-auto w-96 p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] md:w-[700px] lg:w-[700px]">
				<div className="flex flex-col gap-3">
					<div className="flex justify-between">
						<span className="inline-flex items-center gap-3">
							<CircleUser />
							{name}
						</span>
						<EditProjectButton projectId={id} isAdmin={isAdmin}>
							<Pencil />
						</EditProjectButton>
					</div>
					<span className="inline-flex items-center gap-3">
						<MapPinHouse />
						{address}
					</span>
				</div>
				<div className="my-3 grid grid-cols-1 gap-3 md:grid-cols-3 md:place-items-center">
					<p className="inline-flex items-center gap-3 md:justify-center">
						<BatteryCharging />
						<span>
							<strong>Potência:</strong> {potency} kWp
						</span>
					</p>
					<p className="inline-flex items-center gap-3 md:justify-center">
						<ChartNoAxesCombined />
						<span>
							<strong>Produção estimada:</strong> {estimation} kWh/mês
						</span>
					</p>
					<p className="inline-flex items-center gap-3 md:justify-center">
						<ImageIcon />
						<span>
							<strong>{imageURLs.length}</strong>
						</span>
					</p>
				</div>
				<Slider sliderId={`slider-${id}`} log={name === 'Paulo'}>
					{imageURLs.map((url, i) => {
						const key = `image-${i}`
						return (
							<ImageComponent
								alt=""
								key={key}
								src={`${SUBDOMAINBUCKETURL}/${url}`}
								width="0"
								height="0"
								sizes="600px"
								className="mx-auto w-[600px] rounded-lg"
							/>
						)
					})}
				</Slider>
			</div>
		</>
	)
}
