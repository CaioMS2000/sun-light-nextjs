'use client'
import { useEffect } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormError from '@/components/form-error'
import { Label } from '@/components/ui/label'
import FormField from '@/components/formField'
import { FileInput } from '@/components/input-file'
import { BookmarkPlus, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import {
	createProjectSchema,
	CreateProjectFormData,
} from '@/app/schema/create-project-schema'
import { createProjectAction } from '@/app/actions'

function UploadForm() {
	const {
		register,
		reset,
		handleSubmit,
		control,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<CreateProjectFormData>({
		resolver: zodResolver(createProjectSchema),
		defaultValues: {
			name: '',
			address: '',
			potency: '',
			estimation: '',
			pj: false,
		},
	})

	useEffect(() => {
		if (isSubmitSuccessful) {
			toast.success('Projeto criado')
			reset()
		}
	}, [isSubmitSuccessful, reset])

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) {
			const errorMessages = Object.values(errors)
				.map(error => error.message)
				.join('\n')
			console.log(errorMessages)
			toast.error(`Erro no upload:\n${errorMessages}`)
		}
	}, [errors])

	return (
		<>
			<form onSubmit={handleSubmit(createProjectAction)} className="p-3">
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

				<Button
					type="submit"
					className="mt-10 bg-sun-light-blue"
					disabled={isSubmitting}
				>
					{!isSubmitting && <span>Criar novo projeto</span>}
					{isSubmitting && (
						<span className="inline-flex items-center gap-2">
							<LoaderCircle className="animate-spin cursor-not-allowed" />
							<span>Criar novo projeto</span>
						</span>
					)}
				</Button>
			</form>
		</>
	)
}

export default UploadForm
