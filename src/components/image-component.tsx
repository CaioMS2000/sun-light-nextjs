'use client'
import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { Skeleton } from './ui/skeleton'

const ImageComponent = ({ className, ...props }: ImageProps) => {
	const [isLoaded, setIsLoaded] = useState(false)
	return (
		<>
			<Skeleton
				className={cn('h-10 w-28 bg-accent-85/20', { hidden: isLoaded })}
			/>
			<Image
				{...props}
				className={cn(className, { invisible: !isLoaded })}
				onLoad={() => setIsLoaded(true)}
			/>
		</>
	)
}

export default ImageComponent
