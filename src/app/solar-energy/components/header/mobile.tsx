import NavHeader from '@/components/nav-header'
import QuoteButton from '../quote-butto'

export default function MobileHeader() {
  return (
    <>
      <header className="relative h-[450px] w-screen md:hidden">
        <NavHeader className="absolute w-screen bg-light-grey/60" />
        <div className='flex h-full w-full items-end bg-[url("/images/banners/Ilpf2eUPpUE.jpg")] bg-cover'>
          <div className="h-fit w-full space-y-5 bg-accent-100 py-5 pl-7 text-white">
            <h3 className="text-2xl">
              Você ainda paga pela sua energia elétrica?
            </h3>
            <p className="max-w-56 text-wrap text-xs">
              Se você quer deixar de ser um <strong>comprador</strong> e se
              tornar um <strong>gerador</strong> da sua própria energia
              elétrica. Solicite um orçamento conosco clicando no botão abaixo.
            </p>
            <QuoteButton />
          </div>
        </div>
      </header>
    </>
  )
}
