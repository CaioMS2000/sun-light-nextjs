import Edit from './components/edit'

interface PageParams {
	params: Promise<{ id: string }>
}

export default async function Page({ params }: PageParams) {
	const _params = await params
	const { id } = _params

	return (
		<>
			<Edit projectId={id} />
		</>
	)
}
