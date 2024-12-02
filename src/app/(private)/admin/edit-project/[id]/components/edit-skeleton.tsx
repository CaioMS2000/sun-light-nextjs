'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Sun } from 'lucide-react'

export default function EditSkeleton() {
	return (
		<>
			<div className="mb-5 bg-sun-light-yellow p-3">
				<h3 className="font-bold text-xl">Editando o projeto</h3>
				<p className="inline-flex items-center gap-3 text-sm italic">
					<Sun />
					<span>
						<strong>Sun Light Engenharia do Sol</strong>
					</span>
				</p>
			</div>

			<div className="px-3 md:text-xl">
				<div className="flex flex-col gap-3 md:flex-row md:gap-10">
					<div className="flex flex-col gap-3">
						<Skeleton className="mx-auto mt-10 h-10 w-36 rounded-lg bg-accent-100/30" />
						<Skeleton className="mx-auto mt-10 h-10 w-36 rounded-lg bg-accent-100/30" />
					</div>
					<div className="flex flex-col gap-3">
						<div className="inline-flex items-center gap-3">
							<Skeleton className="mx-auto mt-10 h-10 w-36 rounded-lg bg-accent-100/30" />
							<Skeleton className="mx-auto mt-10 h-10 w-36 rounded-lg bg-accent-100/30" />
						</div>
						<div className="inline-flex items-center gap-3">
							<Skeleton className="mx-auto mt-10 h-10 w-36 rounded-lg bg-accent-100/30" />
							<Skeleton className="mx-auto mt-10 h-10 w-36 rounded-lg bg-accent-100/30" />
						</div>
					</div>
				</div>

				<Skeleton className="mx-auto mt-10 h-24 w-80 rounded-lg bg-accent-100/30" />

				<Skeleton className="mx-auto mt-10 size-96 rounded-lg bg-accent-100/30" />
			</div>
		</>
	)
}
