import { z } from 'zod'

export const createProjectSchema = z.object({
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

export type CreateProjectFormData = z.infer<typeof createProjectSchema>
