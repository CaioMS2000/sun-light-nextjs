'use client'
import { getCookie } from 'cookies-next/client'
import Image from 'next/image'
import { SquareUser } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
	const [adminName, setAdminName] = useState('')

	useEffect(() => {
		const nameCookie = getCookie('@sunlight-admin:name')

		if (nameCookie) setAdminName(nameCookie)
	}, [])

	return (
		<>
			<div className="flex items-center justify-between bg-sun-light-blue p-4">
				<Link href={'/'}>
					<Image
						alt=""
						src={'/images/logo_white.png'}
						width="0"
						height="0"
						sizes="100vw"
						className="h-20 w-auto rounded-lg"
					/>
				</Link>
				<p className="inline-flex items-center gap-2 font-bold text-white text-xl">
					<SquareUser className="size-6" />
					<span>{adminName}</span>
				</p>
			</div>
		</>
	)
}
