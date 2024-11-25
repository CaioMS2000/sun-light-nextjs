'use client'
import { getCookie } from 'cookies-next'
import UploadForm from './component/uploadForm'
import Image from 'next/image'
import { SquareUser } from 'lucide-react'

export default function Admin() {
  const nameCookie = getCookie('@sunlight-admin:name')

  return (
    <>
      <div className="flex items-center justify-between bg-sun-light-blue p-4">
        <Image
          alt=""
          src={'/images/logo_white.png'}
          width="0"
          height="0"
          sizes="100vw"
          className="h-20 w-auto rounded-lg"
        />
        <p className="inline-flex items-center gap-2 font-bold text-white text-xl">
          <SquareUser className="size-6" />
          {/* {nameCookie} */}
        </p>
      </div>
      <UploadForm />
    </>
  )
}
