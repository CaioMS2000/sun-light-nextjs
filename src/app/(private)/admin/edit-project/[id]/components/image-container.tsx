'use client'

import { X } from 'lucide-react'
import { ReactNode, useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { toast } from 'sonner'

interface ImageContainerProps {
	children: ReactNode
	image: string
	projectId: string
}

export default function ImageContainer({
	children,
	image,
	projectId,
}: ImageContainerProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { mutateAsync } = useMutation({
		mutationFn: async () => {
			try {
				const response = await fetch('/system/delete-image', {
					method: 'DELETE',
					body: JSON.stringify({
						image,
						projectId,
					}),
				})

				toast.success('Imagem deletada com sucesso')
			} catch (error) {
				toast.error('Erro ao deletar imagem')
			}
		},
	})
	let content: ReactNode = undefined

	if (Array.isArray(children)) {
		content = children[0]
	} else {
		content = children
	}

	async function handleDeleteImage() {
		await mutateAsync()
		queryClient.invalidateQueries({ queryKey: ['project', projectId] })
		setIsOpen(false)
	}

	return (
		<>
			<div className="relative mx-auto w-fit">
				<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
					<AlertDialogTrigger>
						{content}
						<div className="absolute top-2 right-2 cursor-pointer rounded-full bg-black/50 p-2">
							<X className="stroke-[5px] text-red-500" />
						</div>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Tem certeza de que quer deletar essa imagem?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Esta ação não pode ser desfeita.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							{/* <AlertDialogAction asChild> */}
							<Button className="bg-red-500" onClick={handleDeleteImage}>
								Deletar
							</Button>
							{/* </AlertDialogAction> */}
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</>
	)
}
