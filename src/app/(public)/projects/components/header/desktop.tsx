import NavHeader from '@/components/nav-header'
import { Building } from 'lucide-react'

export default function DesktopHeader() {
  return (
    <>
      <header className='relative hidden h-[400px] w-screen bg-[position:0%_70%] bg-[url("/images/banners/gf4893g16e.jpg")] bg-cover md:flex'>
        <NavHeader className="absolute w-screen text-white" />
        <div className="flex h-full w-full items-end">
          <h3 className="inline-flex w-full items-center gap-2 bg-accent-100 p-4 text-3xl text-white">
            <Building className="size-10" />
            <strong>Nossos projetos</strong>
          </h3>
        </div>
      </header>
    </>
  )
}
