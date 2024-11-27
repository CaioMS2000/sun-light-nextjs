import { cn } from '@/lib/utils'
import React from 'react'

interface FormErrorProps extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

const FormError: React.FC<FormErrorProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div {...props} className={cn('text-red-500', className)}>
			{children}
		</div>
	)
}

export default FormError
