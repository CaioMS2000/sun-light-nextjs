'use client'
import Image, { ImageProps } from 'next/image'

interface IconComponentProps {
	className?: string
}

const IconComponent = ({ className }: IconComponentProps) => {
	const bgIsDark =
		className?.includes('bg-accent') || className?.includes('bg-black')
	if (bgIsDark) {
		return (
			<>
				<Image
					src={'/images/logo_white.png'}
					alt=""
					width="0"
					height="0"
					sizes="1000px"
					className="w-32 rounded-lg"
				/>
			</>
		)
	}
	return (
		<>
			<div className="grid grid-cols-[auto,1fr] gap-2">
				<Image
					src={'/images/logo_icon_alpha_sm.png'}
					alt=""
					// width={50}
					// height={50}
					width="0"
					height="0"
					sizes="100px"
					className="w-12 lg:w-16"
				/>
				<div className="flex flex-col justify-center">
					<p className="font-semibold text-sun-light-blue">Sun Light</p>
					<p className="text-dark-grey">Engenharia do Sol</p>
				</div>
			</div>
		</>
	)
}

export default IconComponent
