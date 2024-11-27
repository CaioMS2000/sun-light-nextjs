'use client'
import React from 'react'
import { useForm, SubmitHandler, FieldError } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormError from '@/components/form-error'
import { Label } from '@/components/ui/label'
import FormField from './formField'
import { FileInput } from './inputFile'
import { BookmarkPlus } from 'lucide-react'

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
	name: z.string().min(1, { message: 'O nome é obrigatório.' }),
	address: z.string().min(1, { message: 'O endereço é obrigatório.' }),
	potency: z.string().min(1, { message: 'A potência é obrigatória.' }),
	estimation: z.string().min(1, { message: 'A estimativa é obrigatória.' }),
	pj: z.boolean(),
})

type FormData = z.infer<typeof uploadSchema>

function UploadForm() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(uploadSchema),
		defaultValues: {
			name: '',
			address: '',
			potency: '',
			estimation: '',
			pj: false,
		},
	})

	const onSubmit: SubmitHandler<FormData> = async data => {
		const formData = new FormData()

		Array.from(data.files).forEach(file => {
			formData.append('files', file)
		})

		formData.append('name', data.name)
		formData.append('address', data.address)
		formData.append('potency', data.potency)
		formData.append('estimation', data.estimation)
		formData.append('pj', data.pj.toString())

		try {
			const response = await fetch('/create-project', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const result = await response.json()
			console.log('Upload bem-sucedido:', result)
		} catch (error) {
			console.error('Erro no upload:', error)
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="p-3">
				<p className="mb-5 inline-flex items-center gap-2">
					<BookmarkPlus />
					<strong>Crie um novo projeto</strong>
				</p>
				<div className="mb-1 flex flex-col gap-3 md:flex-row">
					<div className="space-y-4">
						<FormField>
							<Input
								type="text"
								{...register('name')}
								className="w-auto"
								placeholder="Nome"
							/>
							{errors.name && <FormError>{errors.name.message}</FormError>}
						</FormField>
						<FormField>
							<Input
								type="text"
								{...register('address')}
								className="w-auto"
								placeholder="Endereço"
							/>
							{errors.address && <FormError>{errors.address.message}</FormError>}
						</FormField>
					</div>
					<div className="space-y-4">
						<FormField>
							<Input
								type="text"
								{...register('potency')}
								className="w-auto"
								placeholder="Potência: kWp"
							/>
							{errors.potency && <FormError>{errors.potency.message}</FormError>}
						</FormField>
						<FormField>
							<Input
								type="text"
								{...register('estimation')}
								className="w-auto"
								placeholder="Estimativa: kWh/mês"
							/>
							{errors.estimation && <FormError>{errors.estimation.message}</FormError>}
						</FormField>
					</div>
				</div>

				<div className="space-y-4">
					<FormField>
						<div className="flex items-center">
							<Input type="checkbox" {...register('pj')} className="mr-2 w-fit" />
							<Label className="text-sm" htmlFor="pj">
								Cliente PJ
							</Label>
						</div>
						{errors.pj && <FormError>{errors.pj.message}</FormError>}
					</FormField>
					<FileInput
						name="files"
						control={control}
						label="Selecione seus arquivos"
						error={errors.files as FieldError | undefined}
					/>
				</div>

				<Button type="submit" className="mt-10 bg-sun-light-blue">
					Criar novo projeto
				</Button>
			</form>
		</>
	)
}

export default UploadForm
