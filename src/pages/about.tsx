import { Inter } from "next/font/google";

import Layout from "./_layout";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
	return (
		<>
			<Layout>
				{/* banner */}
				<Flex
					backgroundImage={"url(images/banners/IMG_8651.jpg)"}
					h={"20vh"}
					minH={"300px"}
					backgroundRepeat={"no-repeat"}
					backgroundPosition={"0 50%"}
					backgroundSize={"cover"}
				>
					<Flex
						align={useBreakpointValue({
							base: "center",
							md: "end",
							lg: "end",
							xl: "end",
						})}
						w={useBreakpointValue({
							base: "100%",
						})}
					>
						<Flex
							color={"#fff"}
							fontWeight={"bold"}
							background={"#0000008a"}
							h={"fit-content"}
							paddingBlock={useBreakpointValue({
								base: "2rem",
								md: "1rem",
								lg: "1rem",
								xl: "1rem",
							})}
							paddingInline={useBreakpointValue({
								base: "0",
								md: "5rem 3rem",
								lg: "5rem 3rem",
								xl: "5rem 3rem",
							})}
							w={useBreakpointValue({
								base: "100%",
								md: "initial",
								lg: "initial",
								xl: "initial",
							})}
							justify={"center"}
							direction="column"
						>
							<Text
								fontSize={useBreakpointValue({
									base: "2xl",
									md: "4xl",
									lg: "4xl",
									xl: "4xl",
								})}
								color={"sun-light.yellow"}
								m={0}
								align={useBreakpointValue({
									base: "center",
									md: "left",
								})}
							>
								Sun Light Engenharia
							</Text>
							<Text
								fontSize={"xl"}
								m={0}
								align={useBreakpointValue({
									base: "center",
									md: "left",
								})}
							>
								SOBRE A NOSSA EMPRESA
							</Text>
						</Flex>
					</Flex>
				</Flex>
				{/* conteúdo */}
				<Flex
					// h={"fit-content"}
					// background={"blue"}
					paddingInline={"1rem"}
					marginTop={"5rem"}
				>
					<Box
						w={"1.1rem"}
						background={"#8d8d8d"}
						borderRadius={10}
					></Box>
					<Flex
						h={"fit-content"}
						grow={1}
						// background={"red"}
						textShadow={"0 4px 4px rgba(0,0,0,.25)"}
						paddingLeft={"20px"}
					>
						<Text
							fontSize={useBreakpointValue({
								base: "2xl",
								md: "3xl",
								lg: "4xl",
								xl: "4xl",
							})}
							fontWeight={"semibold"}
						>
							A Sun Light Engenharia do Sol é uma empresa de que
							fornece soluções completas para o desenvolvimento de
							projetos e execução de obras ligada a todo o campo
							da engenharia civil.
						</Text>
					</Flex>
				</Flex>

				<Flex
					backgroundImage={
						"url(images/banners/raphael-cruz-IwY-27ceRCA-unsplash.jpg)"
					}
					h={"fit-content"}
					backgroundRepeat={"no-repeat"}
					backgroundPosition={useBreakpointValue({
						base: "15% 50%",
						md: "0 50%",
					})}
					backgroundSize={"cover"}
					marginTop={"5rem"}
					paddingTop={"25rem"}
				>
					<Flex
						align={"end"}
						justify={"end"}
						w={useBreakpointValue({
							base: "100%",
						})}
					>
						<Flex
							fontWeight={"bold"}
							background={"sun-light.yellow"}
							h={"fit-content"}
							paddingBlock={useBreakpointValue({
								base: "2rem",
								md: "1rem",
								lg: "1rem",
								xl: "1rem",
							})}
							paddingInline={"1rem"}
							w={"90%"}
							justify={"center"}
							direction="column"
							borderTopLeftRadius={10}
						>
							<Text
								fontSize={useBreakpointValue({
									base: "sm",
									md: "xl",
									lg: "2xl",
									xl: "2xl",
								})}
								color={"#212529"}
								m={0}
								align={useBreakpointValue({
									base: "center",
									md: "left",
								})}
							>
								A partir do ano de 2015, a empresa desenvolveu
								um foco em projetos ligados a energias
								sustentáveis, incluindo os de energia
								fotovoltaica, tendo já executado diversas usinas
								solares de pequeno, médio e grande porte em todo
								o estado de Goiás.
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Flex
					backgroundImage={"url(images/banners/IMG_8711.jpg)"}
					h={"fit-content"}
					backgroundRepeat={"no-repeat"}
					backgroundPosition={useBreakpointValue({
						base: "15% 50%",
						md: "0 50%",
					})}
					backgroundSize={"cover"}
					marginTop={"5rem"}
					paddingBlock={"15rem"}
				>
					<Flex
						align={"center"}
						justify={"center"}
						w={useBreakpointValue({
							base: "100%",
						})}
					>
						<Flex
							fontWeight={"bold"}
							background={"rgba(0,0,0,.8)"}
							h={"fit-content"}
							paddingBlock={"2rem"}
							paddingInline={"1rem"}
							w={"90%"}
							justify={"center"}
							direction="column"
							borderRadius={10}
							color={"#fff"}
						>
							<Text
								fontSize={useBreakpointValue({
									base: "xl",
									md: "2xl",
									lg: "3xl",
									xl: "3xl",
								})}
								align={"center"}
								mb={"3rem"}
							>
								Com equipamentos de última geração e seu corpo
								técnico multidisciplinar, que conta com
								arquitetos, engenheiros eletricistas e
								engenheiros civis altamente capacitados.
							</Text>
							<Text
								fontSize={useBreakpointValue({
									base: "xl",
									md: "2xl",
									lg: "3xl",
									xl: "3xl",
								})}
								m={0}
								align={"center"}
							>
								A Sun Light Engenharia do Sol vem a cada ano
								quebrando barreiras e se destacando no cenário
								da engenharia no estado de Goiás, buscando
								sempre oferecer as melhores soluções para os
								seus clientes.
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Layout>
		</>
	);
}
