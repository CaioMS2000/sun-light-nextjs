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
import FormField from '@/components/formField'
import { Input } from '@/components/ui/input'
import FormError from '@/components/form-error'
import { useState } from 'react'

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

const editSchema = z.object({
	id: z.string().min(1, { message: 'O ID é obrigatório.' }),
	name: z.string().optional(),
	address: z.string().optional(),
	potency: z.string().optional(),
	estimation: z.string().optional(),
})

type EditData = z.infer<typeof editSchema>

interface EditProps {
	projectId: string
}

export default function Edit({ projectId }: EditProps) {
	const [someInputChanged, setSomeInputChanged] = useState(false)
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
		reset: resetUpload,
		handleSubmit: handleSubmitUpload,
		control: controlUploadForm,
		formState: { errors: uploadFormErrors, isSubmitting: isSubmittingUpload },
	} = useForm<FormData>({
		resolver: zodResolver(uploadSchema),
	})
	const {
		reset: resetEdit,
		handleSubmit: handleSubmitEdit,
		control: controlEditForm,
		register: registerEditForm,
		formState: {
			errors: editFormErrors,
			isSubmitting: isSubmittingEdit,
			touchedFields,
		},
	} = useForm<EditData>({
		resolver: zodResolver(editSchema),
		defaultValues: {
			id: projectId,
			name: projectData?.project.name || '',
			address: projectData?.project.address || '',
			potency: projectData?.project.potency
				? String(projectData.project.potency)
				: '',
			estimation: projectData?.project.estimation
				? String(projectData.project.estimation)
				: '',
		},
	})

	const onSubmitUpload: SubmitHandler<FormData> = async data => {
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
			resetUpload()
		} catch (error) {
			toast.error(`Erro no upload: ${error}`)
		}
	}

	const onSubmitEdit: SubmitHandler<EditData> = async data => {
		if (!Object.keys(touchedFields).length) {
			toast.error('Nenhuma alteração foi feita')
			return
		}
		const updatedData = {
			id: projectId,
			name: data.name || projectData?.project.name,
			address: data.address || projectData?.project.address,
			potency: data.potency || projectData?.project.potency,
			estimation: data.estimation || projectData?.project.estimation,
		}

		try {
			const response = await fetch('/system/edit-project', {
				method: 'PUT',
				body: JSON.stringify(updatedData),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			queryClient.invalidateQueries({ queryKey: ['project', projectId] })
			toast.success('Edição concluída')
		} catch (error) {
			toast.error(`Erro na edição: ${error}`)
		}
	}

	const handleInputChange = () => {
		if (someInputChanged === false) {
			setSomeInputChanged(true)
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
				<form onSubmit={handleSubmitEdit(onSubmitEdit)}>
					<div className="flex flex-col gap-3 md:flex-row md:gap-10">
						<div className="flex flex-col gap-3">
							<div className="inline-flex items-center gap-3 font-semibold">
								<CircleUser />
								<FormField>
									<Input
										type="text"
										{...registerEditForm('name')}
										className="w-auto"
										placeholder={`${projectData.project.name}`}
										onChange={handleInputChange}
									/>
									{editFormErrors.name && (
										<FormError>{editFormErrors.name.message}</FormError>
									)}
								</FormField>
							</div>
							<div className="inline-flex items-center gap-3 font-semibold">
								<MapPinHouse />
								<FormField>
									<Input
										type="text"
										{...registerEditForm('address')}
										className="w-auto"
										placeholder={`${projectData.project.address}`}
										onChange={handleInputChange}
									/>
									{editFormErrors.address && (
										<FormError>{editFormErrors.address.message}</FormError>
									)}
								</FormField>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<div className="inline-flex items-center gap-3">
								<BatteryCharging />
								<span>
									<FormField>
										<Input
											type="text"
											{...registerEditForm('potency')}
											className="w-auto"
											placeholder={`${projectData.project.potency ? projectData.project.potency : ''} (kWp)`}
											onChange={handleInputChange}
										/>
										{editFormErrors.potency && (
											<FormError>{editFormErrors.potency.message}</FormError>
										)}
									</FormField>
								</span>
							</div>
							<div className="inline-flex items-center gap-3">
								<ChartNoAxesCombined />
								<span>
									<FormField>
										<Input
											type="text"
											{...registerEditForm('estimation')}
											className="w-auto"
											placeholder={`${projectData.project.estimation ? projectData.project.estimation : ''} (kWh/mês)`}
											onChange={handleInputChange}
										/>
										{editFormErrors.estimation && (
											<FormError>{editFormErrors.estimation.message}</FormError>
										)}
									</FormField>
								</span>
							</div>
						</div>
					</div>
					<Button
						className="mt-5 bg-sun-light-blue"
						type="submit"
						disabled={!Object.keys(touchedFields).length && !someInputChanged}
					>
						{isSubmittingEdit ? (
							<span className="inline-flex items-center gap-2">
								<LoaderCircle className="animate-spin cursor-not-allowed" />
								<span className="text-sm">Salvar</span>
							</span>
						) : (
							<span className="text-sm">Salvar</span>
						)}
					</Button>
				</form>

				<p className="mt-10 inline-flex items-center gap-3 text-lg">
					<ImageIcon />
					<span>
						<strong>{projectData.project.imageURLs.length} imagens</strong>
					</span>
				</p>

				<form
					onSubmit={handleSubmitUpload(onSubmitUpload)}
					className="my-3 flex items-center gap-3"
				>
					<FileInput
						name="files"
						control={controlUploadForm}
						label={<span className="text-sm">Adicionar imagens</span>}
						error={uploadFormErrors.files as FieldError | undefined}
					/>

					<button
						type="submit"
						className="flex rounded-lg bg-sun-light-blue p-2 text-white"
						disabled={isSubmittingUpload}
					>
						{!isSubmittingUpload && <span className="text-sm">Enviar</span>}
						{isSubmittingUpload && (
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
