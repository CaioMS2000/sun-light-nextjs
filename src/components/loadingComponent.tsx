import { LoaderCircle } from 'lucide-react'

interface LoadingComponentProps {
	children?: React.ReactNode
}

export default function LoadingComponent(props?: LoadingComponentProps) {
	const isChildrenInvalid =
		!props?.children ||
		(typeof props.children === 'object' &&
			Object.keys(props.children).length === 0)

	return (
		<>
			<div className="inline-flex items-center gap-3 p-3">
				<LoaderCircle className="animate-spin cursor-not-allowed" />
				<p className="font-semibold">
					{props && !isChildrenInvalid && props.children}
					{isChildrenInvalid && <span>Carregando recursos</span>}
				</p>
			</div>
		</>
	)
}
