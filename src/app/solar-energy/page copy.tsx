import {
  ArrowDownUp,
  CircleDollarSign,
  Drill,
  HandCoins,
  Receipt,
  RefreshCcw,
  Sprout,
  Sun,
  Timer,
  Wrench,
} from 'lucide-react'
import HeaderComponent from './components/header'
import { SEAreaImage } from './components/SEAreaImage'

export default function SolarEnergy() {
  return (
    <>
      <HeaderComponent />
      <div className='mx-auto my-10 w-3/4 bg-[url("/images/banners/IMG_8711.jpg")] bg-cover bg-[position:60%_50%] rounded-xl overflow-hidden'>
        <div className="py-10 bg-black/5 text-center text-white space-y-10">
          <p className=" bg-black/80 text-sun-light-yellow p-3">
            Deixe o sol trabalhar por você
          </p>
          <div className="flex flex-col items-center gap-5 bg-black/80 p-4">
            <Sun className="text-sun-light-yellow" />
            <p className="p">
              Te ajudamos a reduzir até 95% de sua conta de energia, ajudando a
              preservar o meio ambiente
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto my-10 w-full space-y-5 bg-[position:50%_50%] bg-[url("/images/banners/IMG_8651.jpg")] bg-cover py-10'>
        <SEAreaImage src={'/images/se-areas/at1.png'} alt="" />
        <SEAreaImage src={'/images/se-areas/at2.png'} alt="" />
        <SEAreaImage src={'/images/se-areas/at3.png'} alt="" />
        <SEAreaImage src={'/images/se-areas/at4.png'} alt="" />
      </div>

      <div className="mx-auto my-10 w-full grid grid-cols-3">
        <div className="div">
          <strong>
            <RefreshCcw />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        <div className="div">
          <strong>
            <CircleDollarSign />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        <div className="div">
          <strong>
            <Timer />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        <div className="div">
          <strong>
            <Wrench />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        <div className="div">
          <strong>
            <Drill />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        <div className="div">
          <strong>
            <Receipt />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        <div className="div">
          <strong>
            <HandCoins />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        <div className="div">
          <strong>
            <ArrowDownUp />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div>

        {/* <div className="div">
          <strong>
            <Sprout />
            Título
          </strong>
          <p className="p">Conteudo</p>
        </div> */}
      </div>
    </>
  )
}
