import NavHeader from '@/components/nav-header'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <>
      <div className="bg-light-grey">
        <NavHeader />
        <div className="flex h-[200px] items-end md:h-[400px]">
          <div className="w-96 pb-5 pl-6 md:w-[600px] md:pb-12 md:pl-24">
            <h1 className="mb-12 text-3xl md:text-6xl">Sobre nós</h1>
            <p className="text-sm">
              Saiba mais sobre a Sun Light e nosso compromisso com a excelência,
              inovação e sustentabilidade.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-10 flex flex-col gap-10 px-5">
        <div className="flex max-w-[800px] flex-col gap-10">
          <h4 className="text-base md:text-3xl">
            Inovação. <br /> Guiando nossa jornada desde o início.
          </h4>
          <Image
            src={'/images/banners/moritz-kindler--SKRzGN47iQ-unsplash.jpg'}
            alt=""
            width="0"
            height="0"
            sizes="500px"
            className="w-64 self-end rounded-lg md:w-[600px]"
          />
        </div>
        <p className="flex flex-col space-y-4 text-xs">
          <span>
            A inovação tem estado no coração da nossa jornada desde o início. Na
            Sun Light, acreditamos que estar na vanguarda da tecnologia e
            práticas sustentáveis é essencial. Buscamos consistentemente
            soluções inovadoras em energia solar para moldar um futuro mais
            brilhante e mais verde.
          </span>
          <span>
            Nosso compromisso com a inovação nos impulsiona a explorar
            continuamente novos caminhos, refinar nossos processos e entregar
            resultados pioneiros para nossos clientes. Junte-se a nós para
            abraçar a inovação enquanto traçamos um caminho em direção a um
            panorama energético mais sustentável e eficiente.
          </span>
        </p>

        <div className='mx-auto h-40 rounded-lg bg-[position:50%_50%] bg-[url("/images/banners/chelsea-WvusC5M-TM8-unsplash.jpg")] bg-cover text-lg text-white md:h-64 md:text-2xl'>
          <div className="flex h-full items-center justify-center bg-black/30 px-4 text-center md:px-28">
            Construindo o futuro da evolução energética
          </div>
        </div>

        <p className="flex flex-col space-y-4 text-xs">
          <span className="">
            A partir do ano de 2015, a empresa desenvolveu um foco em projetos
            ligados a energias sustentáveis, incluindo os de energia
            fotovoltaica, tendo já executado diversas usinas solares de pequeno,
            médio e grande porte em todo o estado de Goiás.
          </span>
          <span className="">
            Com equipamentos de última geração e seu corpo técnico
            multidisciplinar, que conta com arquitetos, engenheiros eletricistas
            e engenheiros civis altamente capacitados. A Sun Light Engenharia do
            Sol vem a cada ano quebrando barreiras e se destacando no cenário da
            engenharia no estado de Goiás, buscando sempre oferecer as melhores
            soluções para os seus clientes.
          </span>
        </p>
      </div>
    </>
  )
}
