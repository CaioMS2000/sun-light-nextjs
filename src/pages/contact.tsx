import dotenv from "dotenv";
import NextLink from "next/link";
import { useRef } from "react";
import { Inter } from "next/font/google";
import {
	Box,
	Circle,
	Container,
	Flex,
	HStack,
	Text,
	VStack,
	Link,
	useToast,
	useBreakpointValue,
} from "@chakra-ui/react";
import { BsWhatsapp, BsBoxArrowUpRight } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { IoIosPin } from "react-icons/io";
import { AiFillPhone } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";

import Layout from "./_layout";
import Map from "../components/map";
import { Form } from "@/components/form";
import { whatsAppLinks } from "@/_links";
import { UserCopying } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

dotenv.config({ path: ".env.local" });

interface Props {
	mapsAPIKey: any;
	emailAPIKey: any;
	emailAPIServiceId: any;
	emailAPITemplateId: any;
	companyInfo: CompanyInfo;
}

export async function getServerSideProps() {
	const jsonData = require("../../info.json");
	// console.log(jsonData)

	return {
		props: {
			mapsAPIKey: process.env.MAPS_API_KEY,
			emailAPIKey: process.env.EMAIL_API_PUBLIC_KEY,
			emailAPIServiceId: process.env.EMAIL_API_SERVICE_ID,
			emailAPITemplateId: process.env.EMAIL_API_TEMPLATE_ID,
			companyInfo: jsonData,
		},
	};
}

export default function Contact({
	mapsAPIKey,
	emailAPIKey,
	emailAPIServiceId,
	emailAPITemplateId,
	companyInfo,
}: Props) {
	const mapRef = useRef<HTMLDivElement>(null);
	const toast = useToast();

	function handleClick(trigger: string) {
		console.log(trigger);
		let title;
		let data;

		switch (trigger) {
			case "call-only-0":
				title = "Número copiado";
				data = companyInfo.phones.call_only[0];
				UserCopying(data);

				break;

			case "call-only-1":
				title = "Número copiado";
				data = companyInfo.phones.call_only[1];
				UserCopying(data);

				break;

			case "email":
				title = "Email copiado";
				data = companyInfo.email.address;
				UserCopying(data);

				break;

			case "address":
				title = "Endereço copiado";
				data = companyInfo.address;
				UserCopying(data);

				break;

			default:
				break;
		}

		toast({
			title,
			status: "success", //info" | "warning" | "success" | "error" | "loading" | undefined
			isClosable: true,
		});
	}

	return (
		<>
			<Layout>
				<Flex
					flexDir={useBreakpointValue({
						base: "column",
						md: "initial",
						lg: "initial",
						xl: "initial",
					})}
				>
					<Container
						maxW={"400px"}
						bg={"sun-light.blue"}
						color={"#fff"}
						margin={"1rem 0 0 1rem"}
						borderRadius={10}
						p={"2.5rem 1.5rem"}
						boxShadow={"0px 0px 6px #000000d4"}
					>
						<Box>
							<Text
								fontWeight={"semibold"}
								fontSize={"2xl"}
								m={0}
							>
								Informações para contato
							</Text>
						</Box>

						<Box marginTop={"2rem"}>
							<HStack gap={5}>
								<Circle bg={"#fff"} size={"60px"}>
									<BsWhatsapp
										color="green"
										fontSize={"2rem"}
									/>
								</Circle>
								<VStack>
									<Link
										as={NextLink}
										href={whatsAppLinks[0]}
										target="_blank"
										_hover={{
											color: "#fff",
											textDecoration: "underline",
										}}
									>
										<Text
											m={0}
											fontWeight={"bold"}
											fontSize={"medium"}
											display={"flex"}
											alignItems={"center"}
											gap={2}
										>
											{companyInfo.phones.whatsapp[0]}
											<BsBoxArrowUpRight
												color="#ffffff36"
												strokeWidth={1.1}
												fontSize={"small"}
											/>
										</Text>
									</Link>
									{/* <Link
										as={NextLink}
										href={whatsAppLinks[1]}
										target="_blank"
										_hover={{
											color: "#fff",
											textDecoration: "underline",
										}}
									>
										<Text
											m={0}
											fontWeight={"bold"}
											fontSize={"medium"}
											display={"flex"}
											alignItems={"center"}
											gap={2}
										>
											{companyInfo.phones.whatsapp[1]}
											<BsBoxArrowUpRight
												color="#ffffff36"
												strokeWidth={1.1}
												fontSize={"small"}
											/>
										</Text>
									</Link> */}
								</VStack>
							</HStack>
						</Box>

						<Box marginTop={"2rem"}>
							<HStack gap={5}>
								<Circle bg={"#fff"} size={"60px"}>
									<AiFillPhone
										color="#444444"
										fontSize={"2rem"}
									/>
								</Circle>
								<VStack>
									<Text
										m={0}
										fontWeight={"bold"}
										fontSize={"medium"}
										cursor={"pointer"}
										onClick={() => {
											handleClick("call-only-0");
										}}
										display={"flex"}
										alignItems={"center"}
										gap={2}
									>
										{companyInfo.phones.call_only[0]}
										<MdContentCopy
											color="#ffffff36"
											strokeWidth={1.1}
											fontSize={"small"}
										/>
									</Text>
									<Text
										m={0}
										fontWeight={"bold"}
										fontSize={"medium"}
										cursor={"pointer"}
										onClick={() => {
											handleClick("call-only-1");
										}}
										display={"flex"}
										alignItems={"center"}
										gap={2}
									>
										{companyInfo.phones.call_only[1]}
										<MdContentCopy
											color="#ffffff36"
											strokeWidth={1.1}
											fontSize={"small"}
										/>
									</Text>
								</VStack>
							</HStack>
						</Box>

						<Box marginTop={"2rem"}>
							<HStack gap={5}>
								<Circle bg={"#fff"} size={"60px"}>
									<FiMail color="black" fontSize={"2rem"} />
								</Circle>
								<VStack>
									<Text
										m={0}
										fontWeight={"bold"}
										fontSize={"medium"}
										cursor={"pointer"}
										onClick={() => {
											handleClick("email");
										}}
										display={"flex"}
										alignItems={"center"}
										gap={2}
									>
										{companyInfo.email.address}
										<MdContentCopy
											color="#ffffff36"
											strokeWidth={1.1}
											fontSize={"small"}
										/>
									</Text>
								</VStack>
							</HStack>
						</Box>

						<Box marginTop={"2rem"}>
							<HStack gap={5}>
								<Circle bg={"#fff"} size={"60px"}>
									<IoIosPin color="red" fontSize={"2rem"} />
								</Circle>
								<VStack>
									<Text
										m={0}
										fontWeight={"bold"}
										fontSize={"medium"}
										cursor={"pointer"}
										onClick={() => {
											handleClick("address");
										}}
									>
										{companyInfo.address}
									</Text>
								</VStack>
							</HStack>
						</Box>
					</Container>
					<Box
						margin={"1rem 0 0 1rem"}
						flexGrow={1}
						h={"100%"}
						paddingTop={"1rem"}
						paddingRight={"1rem"}
					>
						<Text
							fontWeight={"semibold"}
							fontSize={"2xl"}
							color={"gray.500"}
						>
							Entre em contato por email
						</Text>
						<Form
							emailAPIKey={emailAPIKey}
							emailAPIServiceId={emailAPIServiceId}
							emailAPITemplateId={emailAPITemplateId}
						/>
					</Box>
				</Flex>
				<Flex flexDir="column" marginTop={"1rem"} className={`MAP`}>
					<Flex
						overflow={"hidden"}
						style={{
							borderRadius: "1rem",
						}}
						ref={mapRef}
						className={`MAP2`}
					>
						<Map
							mapsAPIKey={mapsAPIKey}
							mapsAddress={companyInfo.maps.maps_address}
						/>
					</Flex>
				</Flex>
			</Layout>
		</>
	);
}

interface CompanyInfo {
	whatsapp: {
		before_number: string;
		after_number: string;
	};
	email: {
		address: string;
	};
	address: string;
	maps: {
		maps_address: string;
	};
	CEP: string;
	phones: {
		call_only: {
			[key: string]: string;
		};
		whatsapp: {
			[key: string]: string;
		};
	};
}
