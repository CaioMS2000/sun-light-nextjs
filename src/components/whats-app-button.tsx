import Image from 'next/image'
import Link from 'next/link'

export default function WhatsAppButton() {
	return (
		<>
			<Link
				href={'https://api.whatsapp.com/send?phone=556232897574'}
				target="_blank"
			>
				<Image
					src={'https://cdn-icons-png.flaticon.com/512/4494/4494494.png'}
					alt=""
					width="0"
					height="0"
					sizes="100px"
					className="fixed right-10 bottom-10 z-50 w-12 cursor-pointer rounded-full lg:w-16"
				/>
			</Link>
		</>
	)
}
