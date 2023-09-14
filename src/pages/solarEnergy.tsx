import { Inter } from "next/font/google";

import Layout from "./_layout";
import {
	Button,
	Center,
	Container,
	Flex,
	Grid,
	GridItem,
	Highlight,
	Icon,
	Image,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { TbSunset2 } from "react-icons/tb";

const inter = Inter({ subsets: ["latin"] });

export default function SolarEnergy() {
	function budgetRequest() {}

	return (
		<>
			<Layout>
				<Flex
					backgroundImage={
						"url(images/banners/IMG_20220817_074639.jpg)"
					}
					backgroundSize={"cover"}
					backgroundRepeat={"no-repeat"}
					marginBottom={"5rem"}
					backgroundPosition={"bottom"}
					justify={"left"}
				>
					<Container
						maxW={"container.md"}
						bg={"#00000080"}
						color={"#fff"}
						m={0}
						p={"2rem 1rem"}
					>
						<Flex flexDir={"column"}>
							<Text fontWeight={"bold"} fontSize={"5xl"}>
								Você ainda paga pela sua energia elétrica?
							</Text>
							<Text fontSize={"2xl"}>
								<Highlight
									query={["comprador", "gerador"]}
									styles={{
										color: "#fff",
										fontWeight: "extrabold",
									}}
								>
									Se você quer deixar de ser um comprador e se
									tornar um gerador da sua própria energia
									elétrica. Solicite um orçamento conosco
									clicando no botão abaixo.
								</Highlight>
							</Text>
							<Button
								color={"black"}
								style={{ fontWeight: "900" }}
								onClick={budgetRequest}
								maxW={"fit-content"}
							>
								SOLICITAR ORÇAMENTO
							</Button>
						</Flex>
					</Container>
				</Flex>

				<Flex
					backgroundImage={
						"url(images/banners/chelsea-WvusC5M-TM8-unsplash.jpg)"
					}
					backgroundSize={"cover"}
					backgroundRepeat={"no-repeat"}
					marginBottom={"5rem"}
					flexDir={"column"}
					backgroundPosition={"bottom"}
					paddingBlock={"5rem"}
					color={"white"}
					fontWeight={"bold"}
				>
					<Flex
						bg={"#000000a8"}
						marginBottom={"5rem"}
						justify={"center"}
					>
						<Text
							textAlign={"center"}
							m={0}
							fontSize={"5xl"}
							color={"sun-light.yellow"}
						>
							Deixe o Sol trabalhar por você
						</Text>
					</Flex>
					<Container bg={"#000000a8"}>
						<Center>
							<Icon
								as={TbSunset2}
								boxSize={"3rem"}
								color={"sun-light.yellow"}
							/>
						</Center>
						<Text textAlign={"center"} fontSize={"2xl"}>
							Te ajudamos a reduzir até 95% de sua conta de
							energia, ajudando a preservar o meio ambiente
						</Text>
					</Container>
				</Flex>

				<Center marginBottom={"5rem"}>
					<Button
						color={"white"}
						bg={"sun-light.blue"}
						style={{ fontWeight: "900" }}
						onClick={budgetRequest}
						maxW={"fit-content"}
						p={"2rem 1rem"}
						borderRadius={20}
						_hover={{ backgroundColor: "yellow" }}
					>
						<Text m={0} fontSize={"2xl"}>
							SOLICITAR ORÇAMENTO
						</Text>
					</Button>
				</Center>

				<Flex
					backgroundImage={
						"url(images/banners/moritz-kindler--SKRzGN47iQ-unsplash.jpg)"
					}
					backgroundSize={"cover"}
					backgroundRepeat={"no-repeat"}
					marginBottom={"5rem"}
					flexDir={"column"}
					gap={10}
					paddingBlock={"2rem"}
				>
					{se_areas_images_path.map((img_path) => (
						<Image maxW={"50vw"} src={img_path} />
					))}
				</Flex>

				<Center marginBottom={"5rem"}>
					<Button
						color={"white"}
						bg={"sun-light.blue"}
						style={{ fontWeight: "900" }}
						onClick={budgetRequest}
						maxW={"fit-content"}
						p={"2rem 1rem"}
						borderRadius={20}
						_hover={{ backgroundColor: "yellow" }}
					>
						<Text m={0} fontSize={"2xl"}>
							SOLICITAR ORÇAMENTO
						</Text>
					</Button>
				</Center>

				<Flex
					justify={"center"}
					bg={`url(images/icons/bar-chart-fill.svg), url(images/icons/cash-coin.svg), url(images/icons/clipboard-data-fill.svg), url(images/icons/lightning-fill.svg)`}
					backgroundColor={"sun-light.blue"}
					backgroundRepeat={"no-repeat"}
					backgroundPosition={"98% 70%,10% 20%,70% 10%,25% 100%"}
					backgroundSize={"25% 35%"}
					marginBottom={"3rem"}
				>
					<Flex
						m={0}
						p={0}
						w={"full"}
						h={"full"}
						bg={"rgba(35,68,107,.8)"}
						paddingBlock={"3rem"}
						flexDir={"column"}
					>
						<Container
							bg={"white"}
							w={"fit-content"}
							marginBottom={"3rem"}
							borderRadius={10}
						>
							<Text
								m={0}
								textAlign={"center"}
								fontSize={"5xl"}
								fontWeight={"bold"}
							>
								VANTAGENS
							</Text>
						</Container>
						<Grid
							w={"full"}
							className={`GRID`}
							templateColumns={useBreakpointValue({
								base: "repeat(1, 1fr)",
								md: "repeat(1, 1fr)",
								lg: "repeat(1, 1fr)",
								xl: "repeat(3, 1fr)",
							})}
							gap={useBreakpointValue({
								base: 2,
								md: 6,
								lg: 10,
							})}
						>
							{se_advantages_images_path.map(
								(img_path, index) => (
									<Center>
										<GridItem key={index}>
											<Image
												maxW={"50vw"}
												src={img_path}
											/>
										</GridItem>
									</Center>
								)
							)}
						</Grid>
					</Flex>
				</Flex>

				<Center marginBottom={"5rem"}>
					<Button
						color={"black"}
						bg={"yellow"}
						style={{ fontWeight: "900" }}
						onClick={budgetRequest}
						maxW={"fit-content"}
						p={"2rem 1rem"}
						borderRadius={20}
						boxShadow={"0px 0px 6px #000000d4"}
						_hover={{
							backgroundColor: "sun-light.blue",
							color: "white",
						}}
					>
						<Text
							m={0}
							fontSize={"2xl"}
							color={"#inherit"}
							_hover={{ color: "inherit" }}
						>
							QUERO FAZER UM ORÇAMENTO
						</Text>
					</Button>
				</Center>
			</Layout>
		</>
	);
}

const se_areas_images_path: string[] = [
	"images/se-areas/at1.png",
	"images/se-areas/at2.png",
	"images/se-areas/at3.png",
	"images/se-areas/at4.png",
];
const se_advantages_images_path: string[] = [
	"images/se-advantages/vt1.png",
	"images/se-advantages/vt2.png",
	"images/se-advantages/vt3.png",
	"images/se-advantages/vt4.png",
	"images/se-advantages/vt5.png",
	"images/se-advantages/vt6.png",
	"images/se-advantages/vt7.png",
	"images/se-advantages/vt8.png",
	"images/se-advantages/vt9.png",
];
