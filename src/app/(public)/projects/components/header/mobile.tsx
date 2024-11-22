import NavHeader from '@/components/nav-header'
import { Building } from 'lucide-react'

export default function MobileHeader() {
  return (
    <>
      <header className="relative h-[450px] w-screen md:hidden">
        <NavHeader className="absolute w-screen bg-light-grey/60" />
        <div className='flex h-full w-full items-end bg-[url("/images/banners/gf4893g16e.jpg")] bg-cover'>
          <div className="h-fit w-full space-y-5 bg-accent-100 py-5 pl-7 text-white">
            <h3 className="inline-flex w-full items-center gap-2 bg-accent-100 p-4 text-3xl text-white">
              <Building className="size-10" />
              <strong>Nossos projetos</strong>
            </h3>
          </div>
        </div>
      </header>
    </>
  )
}
