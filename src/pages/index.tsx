import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import Layout from "./_layout";
import { Center, Container, Flex, Text } from "@chakra-ui/react";
import BulletCard from "@/components/bulletCard";
import StylishCard from "@/components/stylishCard";

const inter = Inter({ subsets: ["latin"] });

interface DetailRefs {
  [key: string]: React.RefObject<HTMLDivElement>;
}

export default function Home() {
  const detailRef1 = useRef<HTMLDivElement>(null);
  const detailRef2 = useRef<HTMLDivElement>(null);
  const detailRef3 = useRef<HTMLDivElement>(null);
  const detailRef4 = useRef<HTMLDivElement>(null);
  const detailRef5 = useRef<HTMLDivElement>(null);
  // let el = document.querySelector('.detail:nth-of-type(1)')
  // console.log(el)
  // el.focus()
  // detailRef1.current?.scrollIntoView()
  const [bulletCardMaxWidth, setBulletCardMaxWidth] = useState(0);

  // Run the calculation once the component is mounted
  useEffect(() => {
    const bulletCards = document.querySelectorAll('.bullet-card');
    let newMaxWidth = 0;
    bulletCards.forEach((card) => {
      const cardWidth = (card as HTMLElement).offsetWidth;
      if (cardWidth > newMaxWidth) {
        newMaxWidth = cardWidth;
      }
    });
    setBulletCardMaxWidth(newMaxWidth);
  }, []);


  return (
    <>
      <Layout>
        <Flex
          backgroundImage={"url(images/services/plantas.png)"}
          backgroundSize={"cover"}
        >
          <Flex
            paddingBottom={"2rem"}
            flexDir={"column"}
            backgroundColor={"#ffffffb4"}
            w={"full"}
            h={"full"}
          >
            <Container
              bg={"sun-light.blue"}
              w={"fit-content"}
              maxW={"5xl"}
              paddingBlock={"1rem"}
              borderBottomRadius={10}
              color={"#fff"}
              fontWeight={"bold"}
            >
              <Flex
              gap={"15px"}
              >
                <Text fontSize={["xl", "3xl", "5xl"]} align={"center"} m={0}>
                  Soluções em
                </Text>
                <Text
                  fontSize={["xl", "3xl", "5xl"]}
                  align={"center"}
                  m={0}
                  color={"sun-light.yellow"}
                >
                  Engenharia
                </Text>
              </Flex>
            </Container>
            
            <Center>
              <Flex marginBlock={"2rem"} flexDir={"column"} gap={5} id='job-section'>
                {/* <style>
                  {`.bullet-card {
                      width: ${bulletCardMaxWidth == 0?'fit-content':bulletCardMaxWidth}px;
                    }

                    .bullet-card:hover {
                      cursor: pointer;
                    }
                    `
                  }
                </style> */}
                <BulletCard imgUrl="images/services/christopher-burns-Wiu3w-99tNg-unsplash.jpg" text="PROJETOS ESTRUTURAIS" onClick={() => {
                  detailRef1.current?.scrollIntoView({ behavior: 'smooth' })
                }}/>
                <BulletCard imgUrl="images/services/ryan-ancill-0w1MiTY78h0-unsplash.jpg" text="PROJETOS DE ARQUITETURA" onClick={() => {
                  detailRef2.current?.scrollIntoView({ behavior: 'smooth' })
                }}/>
                <BulletCard imgUrl="images/services/carlos-muza-hpjSkU2UYSU-unsplash.jpg" text="LAUDOS TÉCNICOS" onClick={() => {
                  detailRef3.current?.scrollIntoView({ behavior: 'smooth' })
                }}/>
                <BulletCard imgUrl="images/services/anna-jimenez-calaf-PLOq7Ouq0fM-unsplash.jpg" text="SOLUÇÕES EM ENERGIAS RENOVÁVEIS" onClick={() => {
                  detailRef4.current?.scrollIntoView({ behavior: 'smooth' })
                }}/>
                <BulletCard imgUrl="images/services/les-dehamer-GCyNrD_HMls-unsplash.jpg" text="PROJETOS COMPLEMENTARES" onClick={() => {
                  detailRef5.current?.scrollIntoView({ behavior: 'smooth' })
                }}/>
              </Flex>

            </Center>
            <Center>
              <Flex id='detail-section' flexDir={'column'} gap={'5rem'} marginTop={'5rem'}>
                <Container maxW='container.lg'>
                  <StylishCard
                  reference={detailRef1}
                  color="#EFA92D"
                  title="PROJETOS ESTRUTURAIS"
                  text="O projeto estrutural é fundamental para evitar problemas como trincas e desmoronamento em uma edificação e até mesmo gastos de obra desnecessários. Seja ela de pequeno, médio ou grande porte, esse projeto é de grande importância."
                  imgUrl="images/services/detail/1.jpg"
                  />
                </Container>
                <Container maxW='container.lg'>
                  <StylishCard
                  reference={detailRef2}
                  color="#A40606"
                  title="PROJETOS DE ARQUITETURA"
                  text="Um projeto de arquitetura começa com um estudo, tendo como objetivo definir a melhor forma de construir e organizar os espaços de uma casa ou edifício, de acordo com as necessidades de quem vai usá-lo.
                  Ao desenvolver o projeto, o arquiteto precisa considerar diversos fatores, incluindo as características do local (tamanho do terreno, topografia e regulamentação local), a funcionalidade dos espaços, a beleza e harmonia das formas, o conforto das pessoas (incluindo conforto visual, térmico, acústico, entre outros aspectos), as técnicas construtivas e materiais que serão usados, as leis e normas técnicas que precisam ser seguidas, e o custo e o prazo da obra."
                  imgUrl="images/services/detail/2.jpg"
                  />
                </Container>
                <Container maxW='container.lg'>
                  <StylishCard
                  reference={detailRef3}
                  color="#23CE40"
                  title="LAUDOS TÉCNICOS"
                  text="O laudo técnico é um documento emitido por um profissional especialista onde é feita uma avaliação detalhada do empreendimento, apresentando o nível da construção, se o perito identificou algum problema, mesmo que simples, como resolver essas falhas e impedir que se agravem."
                  imgUrl="images/services/detail/3.jpg"
                  />
                </Container>
                <Container maxW='container.lg'>
                  <StylishCard
                  reference={detailRef4}
                  color="#23446B"
                  title="SOLUÇÕES EM ENERGIAS RENOVÁVEIS"
                  text='As energias renováveis são o presente e, ao mesmo tempo, o futuro da produção mundial de eletricidade. O termo "renovável" incorpora a essência desse tipo de energia: a capacidade de estar disponível na natureza e se regenerar continuamente, sem intervenção humana, espontaneamente e em uma quantidade inesgotável.'
                  imgUrl="images/services/detail/4.jpg"
                  />
                </Container>
                <Container maxW='container.lg'>
                  <StylishCard
                  reference={detailRef5}
                  color="#212529"
                  title="PROJETOS COMPLEMENTARES"
                  text={
                    <>
                    São chamados de projetos complementares os projetos elétrico, hidrossanitário, luminotécnico, climatização, proteção contra descargas atmosféricas (SPDA), proteção contra incêndio, cabeamento estruturado, áudio de vídeo, entre outros. Todos estes projetos devem seguir as normas vigentes estabelecidas pela Associação Brasileira de Normas Técnicas (ABNT).
                  No projeto elétrico, você encontrará informações detalhadas das instalações elétricas da obra, sobre a utilização dos pontos elétricos, as cargas da edificação e sua distribuição, a segurança da instalação e o padrão de alimentação.
                  <br/>
                  <br/>
                  O projeto hidrossanitário é aquele que engloba toda a distribuição de água fria, água quente, esgoto e água pluvial ao longo da edificação. Ele é essencial para que a água que vem da concessionária chegue até as peças de utilização, como chuveiro, torneiras, etc.
                  O projeto de cabeamento é um método padronizado de construir uma rede de internet, informática e telefonia, seguindo normas nacionais e internacionais, a fim de otimizar a segurança, eficiência e vida útil do sistema.
                    </>
                  }
                  imgUrl="images/services/detail/5.jpg"
                  />
                </Container>
              </Flex>
            </Center>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
}
