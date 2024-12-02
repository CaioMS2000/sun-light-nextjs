'use client'
import { ReactNode, useState } from 'react'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './styles.css'

interface SliderProps {
	settings?: SwiperProps
	children: ReactNode
	sliderId?: string
	log?: boolean
}

const defaultSettings: SwiperProps = {
	slidesPerView: 1,
	pagination: {
		clickable: true,
	},
	navigation: true,
	autoplay: {
		delay: 5000,
	},
	loop: true,
}

export default function Slider({
	settings,
	children,
	sliderId = 'slider-1',
	log = false,
}: SliderProps) {
	const [activeIndex, setActiveIndex] = useState(1)
	const activeSettings = settings ?? defaultSettings
	let content: ReactNode = undefined
	let totalSlides = 1

	if (Array.isArray(children)) {
		content = children.map((child, index) => {
			const key = `${sliderId}-${index}`
			return <SwiperSlide key={key}>{child}</SwiperSlide>
		})
		totalSlides = children.length
	} else {
		content = <SwiperSlide>{children}</SwiperSlide>
		totalSlides = 1
	}

	function handleClickRight() {
		const swiperElement = document.querySelector(`#${sliderId}`)
		if (swiperElement) {
			const swiperArrowElement = swiperElement.querySelector<HTMLElement>(
				'.swiper-button-next'
			)
			if (swiperArrowElement) {
				swiperArrowElement.click()
			} else {
				console.warn('swiperArrowElement not found')
			}
		} else {
			console.warn('swiperElement not found')
		}
	}

	function handleClickLeft() {
		const swiperElement = document.querySelector(`#${sliderId}`)
		if (swiperElement) {
			const swiperArrowElement = swiperElement.querySelector<HTMLElement>(
				'.swiper-button-prev'
			)
			if (swiperArrowElement) {
				swiperArrowElement.click()
			} else {
				console.warn('swiperArrowElement not found')
			}
		} else {
			console.warn('swiperElement not found')
		}
	}

	return (
		<>
			<div className="mb-5">
				<Swiper
					id={sliderId}
					modules={[Navigation, Pagination, A11y, Autoplay]}
					onSlideChange={e => {
						if (log) {
							// console.clear()
							// console.log(e.activeIndex)
						}
					}}
					{...activeSettings}
				>
					{content}
				</Swiper>
			</div>
			<div className="flex justify-center gap-10">
				<Button type="button" onClick={handleClickLeft}>
					<ChevronLeft className="h-10 w-10" />
				</Button>
				<Button type="button" onClick={handleClickRight}>
					<ChevronRight className="h-10 w-10" />
				</Button>
			</div>
		</>
	)
}
