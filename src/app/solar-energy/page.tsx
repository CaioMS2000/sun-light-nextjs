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
import QuoteButton from './components/quote-butto'

const advantages = [
  {
    icon: <RefreshCcw />,
    title: 'Barata, Limpa e Renovável',
    content:
      'Por ser gerada a partir da captação da luz do sol, é uma fonte de energia gratuita, renovável, limpa e sustentável, além de reduzir ou zerar os custos com a conta mensal de energia.',
  },
  {
    icon: <CircleDollarSign />,
    title: 'Retorno do Investimento',
    content:
      'O retorno do investimento em energia fotovoltaica é de 3 a 7 anos, dependendo do projeto, com redução mínima de 80% na conta mensal, que pode chegar a 100% ou até mesmo gerar renda extra (venda do excedente).',
  },
  {
    icon: <Timer />,
    title: 'Vida Útil',
    content:
      'O sistema de energia fotovoltaica tem vida útil média de 30 anos. Ou seja: após o retorno do investimento que em média é de 5 anos a geração ainda continua por 25 anos ou mais.',
  },
  {
    icon: <Wrench />,
    title: 'Manutenção Barata',
    content:
      'Um sistema fotovoltaico não tem engrenagens ou motores. Sua manutenção se restringe à verificação dos equipamentos e realização de limpezas periódicas nos módulos fotovoltaicos.',
  },
  {
    icon: <Drill />,
    title: 'Instalação Rápida',
    content:
      'Em poucos dias o sistema está montado e funcionando, gerando retorno imediato. Essas instalações podem ser feitas em casas, edifícios, condomínios, comércios, indústrias e propriedades rurais, em qualquer tipo de edificação que utilize energia elétrica da rede.',
  },
  {
    icon: <Receipt />,
    title: 'Valorização do Imóvel',
    content:
      'Imóveis que contam com sistemas fotovoltaicos são cada vez mais valorizados no mercado, podendo agregar até 5% ao valor venal.',
  },
  {
    icon: <HandCoins />,
    title: 'Doação de Créditos em Kilowatts',
    content:
      'Permite gerar energia em um local e doar o excedente para outras unidades consumidoras. É possível também fazer a distribuição compartilhada em condomínios.',
  },
  {
    icon: <ArrowDownUp />,
    title: 'Fluxo de Caixa',
    content:
      'A sua empresa pode ter descontos e deixar de pagar as mesmas tarifas de uma conta normal da concessionária. Com isso, é possível obter um fluxo de caixa estável, com a previsibilidade de um valor médio gasto mensalmente.',
  },
  {
    icon: <Sprout />,
    title: 'Maior Sustentabilidade',
    content:
      'Investir em uma fonte de energia 100% limpa alinha sua empresa à nova visão de mercado, mais pautada em sustentabilidade (ESG). Sendo ainda possível negociar o crédito de carbono gerado pela usina.',
  },
]

export default function SolarEnergy() {
  return (
    <>
      <HeaderComponent />
      <div className='mx-auto my-10 w-3/4 overflow-hidden rounded-xl bg-[position:60%_50%] bg-[url("/images/banners/IMG_8711.jpg")] bg-cover md:bg-[position:60%_80%]'>
        <div className="space-y-10 bg-black/5 py-10 text-center text-white">
          <p className=" bg-black/80 p-3 text-sun-light-yellow md:text-2xl">
            Deixe o sol trabalhar por você
          </p>
          <div className="flex flex-col items-center gap-5 bg-black/80 p-4">
            <Sun className="text-sun-light-yellow md:size-14" />
            <p className="md:text-xl">
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
      <div className="mx-auto my-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {advantages.map(advantage => (
          <div
            key={advantage.title}
            className="mx-auto w-80 rounded-lg bg-white p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 text-4xl">{advantage.icon}</div>
              <h3 className="font-bold text-xl">{advantage.title}</h3>
            </div>
            <p className="text-base text-gray-700">{advantage.content}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <QuoteButton className="my-10 bg-accent-100 px-4 py-6 text-2xl text-white" />
      </div>
    </>
  )
}
