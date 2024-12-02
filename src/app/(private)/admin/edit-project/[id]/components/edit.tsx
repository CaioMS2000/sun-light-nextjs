'use client'
import { Project } from '@/@types/project'
import { useQuery } from '@tanstack/react-query'
import EditSkeleton from './edit-skeleton'
import {
	BatteryCharging,
	ChartNoAxesCombined,
	CircleUser,
	ImageIcon,
	LoaderCircle,
	MapPinHouse,
	MoveLeft,
	Sun,
} from 'lucide-react'
import ImageComponent from '@/components/image-component'
import { SUBDOMAINBUCKETURL } from '@/constants/cloud'
import ImageContainer from './image-container'
import Link from 'next/link'
import { z } from 'zod'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileInput } from '@/components/input-file'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { queryClient } from '@/lib/react-query'

const uploadSchema = z.object({
	files: z
		.any()
		.refine(files => files !== undefined && files !== null, {
			message: 'Você deve enviar pelo menos um arquivo.',
		})
		.refine(files => files instanceof FileList, {
			message: 'Arquivos inválidos',
		})
		.transform(files => Array.from(files))
		.pipe(
			z
				.array(
					z
						.any()
						.refine(file => file instanceof File && file.size <= 500 * 1024 * 1024, {
							message: 'Cada arquivo deve ser menor que 500MB.',
						})
						.refine(
							file =>
								file instanceof File && ['image/jpeg', 'image/png'].includes(file.type),
							{
								message: 'Apenas arquivos JPG e PNG são permitidos.',
							}
						)
				)
				.min(1, { message: 'Você deve enviar pelo menos um arquivo.' })
		),
})

type FormData = z.infer<typeof uploadSchema>

interface EditProps {
	projectId: string
}

export default function Edit({ projectId }: EditProps) {
	const { data: projectData, isLoading } = useQuery({
		queryKey: ['project', projectId],
		queryFn: async () => {
			const response = await fetch(`/system/get-project/${projectId}`)
			const result: { project: Project } = await response.json()

			return result
		},
		staleTime: 1000 * 60 * 60 * 24,
	})
	const {
		reset,
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<FormData>({
		resolver: zodResolver(uploadSchema),
	})

	const onSubmit: SubmitHandler<FormData> = async data => {
		const formData = new FormData()

		Array.from(data.files).forEach(file => {
			formData.append('files', file)
		})

		formData.append('projectId', projectId)

		try {
			const response = await fetch('/system/upload-to-project', {
				method: 'PUT',
				body: formData,
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			toast.success('Upload concluído')
			reset()
		} catch (error) {
			toast.error(`Erro no upload: ${error}`)
		}
	}

	if (isLoading || !projectData) return <EditSkeleton />

	return (
		<>
			<div className="mb-1 bg-sun-light-yellow p-3">
				<h3 className="font-bold text-xl">Editando o projeto</h3>
				<p className="inline-flex items-center gap-3 text-sm italic">
					<Sun />
					<Link href={'/'}>
						<strong>Sun Light Engenharia do Sol</strong>
					</Link>
				</p>
			</div>

			<Link
				href={'/admin'}
				className="mb-5 inline-flex items-center gap-2 pl-2 text-sm"
			>
				<MoveLeft className="size-4" /> <span className="italic">voltar</span>
			</Link>

			<div className="px-3 md:text-xl">
				<div className="flex flex-col gap-3 md:flex-row md:gap-10">
					<div className="flex flex-col gap-3">
						<span className="inline-flex items-center gap-3 font-semibold">
							<CircleUser />
							{projectData.project.name}
						</span>
						<span className="inline-flex items-center gap-3 font-semibold">
							<MapPinHouse />
							{projectData.project.address}
						</span>
					</div>
					<div className="flex flex-col gap-3">
						<p className="inline-flex items-center gap-3">
							<BatteryCharging />
							<span>
								<strong>Potência:</strong> {projectData.project.potency} kWp
							</span>
						</p>
						<p className="inline-flex items-center gap-3">
							<ChartNoAxesCombined />
							<span>
								<strong>Produção estimada:</strong> {projectData.project.estimation}{' '}
								kWh/mês
							</span>
						</p>
					</div>
				</div>

				<p className="mt-10 inline-flex items-center gap-3 text-lg">
					<ImageIcon />
					<span>
						<strong>{projectData.project.imageURLs.length} imagens</strong>
					</span>
				</p>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="my-3 flex items-center gap-3"
				>
					<FileInput
						name="files"
						control={control}
						label={<span className="text-sm">Adicionar imagens</span>}
						error={errors.files as FieldError | undefined}
					/>

					<button
						type="submit"
						className="flex rounded-lg bg-sun-light-blue p-2 text-white"
						disabled={isSubmitting}
					>
						{!isSubmitting && <span className="text-sm">Enviar</span>}
						{isSubmitting && (
							<span className="inline-flex items-center gap-2">
								<LoaderCircle className="animate-spin cursor-not-allowed" />
								<span className="text-sm">Enviar</span>
							</span>
						)}
					</button>
				</form>

				<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{projectData.project.imageURLs.map((url, i) => {
						const key = `image-${i}`
						const completeURL = `${SUBDOMAINBUCKETURL}/${url}`
						return (
							<ImageContainer key={key} image={url} projectId={projectId}>
								<ImageComponent
									alt=""
									src={completeURL}
									width="0"
									height="0"
									sizes="600px"
									className="mx-auto w-[300px] rounded-lg"
								/>
							</ImageContainer>
						)
					})}
				</div>
			</div>
		</>
	)
}
