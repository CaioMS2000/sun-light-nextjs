import { LoaderCircle } from 'lucide-react'

export default function LoadingComponent() {
	return (
		<>
			<div className="inline-flex items-center gap-3 p-3">
				<LoaderCircle className="animate-spin cursor-not-allowed" />
				<p className="font-semibold">Recursos sendo carregados</p>
			</div>
		</>
	)
}
