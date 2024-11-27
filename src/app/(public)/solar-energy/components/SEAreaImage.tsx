import * as React from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

export interface SEAreaImageProps extends ImageProps {}

const SEAreaImage = React.forwardRef<HTMLImageElement, SEAreaImageProps>(
	({ className, ...props }, ref) => {
		return (
			<>
				<Image
					{...props}
					className={cn('w-60 md:hidden', className)}
					ref={ref}
					width="0"
					height="0"
					sizes="100px"
				/>
				<Image
					{...props}
					className={cn('hidden w-[500px] md:block', className)}
					ref={ref}
					width="0"
					height="0"
					sizes="1000px"
				/>
			</>
		)
	}
)
SEAreaImage.displayName = 'SEAreaImage'

export { SEAreaImage }
