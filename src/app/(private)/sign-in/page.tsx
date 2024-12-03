'use client'
import Image from 'next/image'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import { toast } from 'sonner'
import Link from 'next/link'
import UsernameInput from '@/components/username-input'
import PasswordInput from '@/components/password-input'
import { LoaderCircle } from 'lucide-react'

dayjs.extend(utc)
dayjs.locale(ptBR)

const userFormSchema = z.object({
	username: z.string(),
	password: z.string(),
})

type UserFormData = z.infer<typeof userFormSchema>

function SignIn() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const username = searchParams.get('username')
	const {
		register,
		handleSubmit,
		setValue,
		formState: { isSubmitting },
	} = useForm<UserFormData>({
		resolver: zodResolver(userFormSchema),
	})

	async function handleLogin(data: UserFormData) {
		try {
			const response = await fetch('/system/auth', {
				method: 'POST',
				body: JSON.stringify({
					password: data.password,
					username: data.username,
				}),
			})

			if (!response.ok) {
				throw new Error(`${response.statusText}`)
			}

			if (response.redirected && response.url) {
				await new Promise(resolve => setTimeout(resolve, 500))
				router.push(response.url)
			}
		} catch (error) {
			toast.error(
				"Erro ao logar. Se você nunca  se registrou, clique em 'Registrar'"
			)
		}
	}

	useEffect(() => {
		if (username) {
			setValue('username', username)
		}
	}, [username, setValue])

	return (
		<>
			<Link
				href={'/'}
				className="absolute top-3 left-3 font-bold text-white hover:text-sun-light-yellow"
			>
				Página inicial
			</Link>
			<div className="mx-auto flex h-screen w-screen max-w-[1500px] items-center justify-center bg-zinc-900 font-catamaran text-lg">
				<Card className="w-64 border-transparent bg-zinc-800 md:w-96">
					<CardHeader>
						<CardTitle className="flex justify-center">
							<Image
								alt=""
								src={'/images/logo_icon_alpha_sm.png'}
								width="0"
								height="0"
								sizes="100vw"
								className="h-28 w-28"
							/>
						</CardTitle>
						<CardDescription className="text-center text-xl">
							<strong>Faça login</strong>
						</CardDescription>
					</CardHeader>
					<form>
						<CardContent className="flex flex-col justify-center gap-3">
							<UsernameInput hookFormReference={register('username')} />
							<PasswordInput hookFormReference={register('password')} />
						</CardContent>
						<CardFooter className="justify-center gap-5">
							<Link href={'/sign-up'}>
								<Button
									className="border-2 border-sun-light-blue bg-transparent"
									type="button"
								>
									<strong>Criar cadastro</strong>
								</Button>
							</Link>
							<Button
								className="bg-sun-light-blue hover:bg-sun-light-blue-dark"
								type="button"
								onClick={handleSubmit(handleLogin)}
								disabled={isSubmitting}
							>
								{!isSubmitting && <strong>Entrar</strong>}
								{isSubmitting && (
									<span className="inline-flex items-center gap-2">
										<LoaderCircle className="animate-spin cursor-not-allowed" />
										<strong>Entrar</strong>
									</span>
								)}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</>
	)
}

export default function Component() {
	return (
		<Suspense>
			<SignIn />
		</Suspense>
	)
}
