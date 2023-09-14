import { ReactNode, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Textarea,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillHouseFill, BsFillPhoneFill } from "react-icons/bs";

export interface FormProps {
	children?: ReactNode;
	emailAPIKey: any;
	emailAPIServiceId: any;
	emailAPITemplateId: any;
}

type hasWhatsappType = "yes" | "no";

export function Form({
	emailAPIKey,
	emailAPIServiceId,
	emailAPITemplateId,
}: FormProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [whatsapp, setWhatsapp] = useState<hasWhatsappType>("yes");
	const toast = useToast();

	function sendEmail(testing: boolean = false) {
		try {
			if (
				name.length > 0 &&
				email.length > 0 &&
				address.length > 0 &&
				phone.length > 0
			) {
				const params: Record<string, any> = {};

				params["from_name"] = name;
				params["email"] = email;
				params[
					"message"
				] = `Dados do cliente:\nEndereço: ${address}\nTelefone: ${phone}\n`;
				params["message"] +=
					whatsapp == "yes"
						? "este número tambem usa Whatsapp\n"
						: "este número não usa Whatsapp\n";
				params["message"] += `Mensagem: ${message}`;

				if (!testing) {
					// console.log('realmente enviando...')
					emailjs
						.send(
							emailAPIServiceId,
							emailAPITemplateId,
							params,
							emailAPIKey
						)
						.then(
							(response) => {
								// console.log(
								// 	"Email enviado",
								// 	response.status,
								// 	response.text
								// );

								toast({
									title: "Email enviado",
									status: "success",
									isClosable: true,
								});

								setName("");
								setEmail("");
								setAddress("");
								setPhone("");
								setMessage("");
							},
							(error) => {
								console.log("ERRO", error);
							}
						);
				}
			}
		} catch (error) {
			console.log(`ERRO: ${error}`);
			toast({
				title: "Erro no envio de email",
				status: "error",
				isClosable: true,
			});
		}
	}

	return (
		<>
			<Flex>
				<VStack spacing={4} w={"full"}>
					<Flex gap={5} w={"full"}>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<Icon as={BiUser} color="gray.300" />
							</InputLeftElement>
							<Input
								onChange={(e) => {
									setName(e.target.value);
								}}
								value={name}
								size={"lg"}
								// maxW={"20rem"}
								borderInline={"none"}
								borderTop={"none"}
								borderRadius={0}
								type="text"
								placeholder="Digite seu nome"
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<Icon as={AiOutlineMail} color="gray.300" />
							</InputLeftElement>
							<Input
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								value={email}
								size={"lg"}
								// maxW={"20rem"}
								borderInline={"none"}
								borderTop={"none"}
								borderRadius={0}
								type="email"
								placeholder="Digite seu email"
							/>
						</InputGroup>
					</Flex>

					<Flex gap={5} w={"full"}>
						<InputGroup>
							<InputLeftElement pointerEvents="none">
								<Icon as={BsFillHouseFill} color="gray.300" />
							</InputLeftElement>
							<Input
								onChange={(e) => {
									setAddress(e.target.value);
								}}
								value={address}
								size={"lg"}
								// maxW={"20rem"}
								borderInline={"none"}
								borderTop={"none"}
								borderRadius={0}
								type="text"
								placeholder="Endereço"
							/>
						</InputGroup>
						<VStack w={"full"} align={"flex-start"}>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon
										as={BsFillPhoneFill}
										color="gray.300"
									/>
								</InputLeftElement>
								<Input
									onChange={(e) => {
										setPhone(e.target.value);
									}}
									value={phone}
									size={"lg"}
									// maxW={"20rem"}
									borderInline={"none"}
									borderTop={"none"}
									borderRadius={0}
									type="tel"
									placeholder="Celular"
								/>
							</InputGroup>
							<RadioGroup
								value={whatsapp}
								color="gray.500"
								onChange={(e) => {
									console.log(e);
									setWhatsapp(e as hasWhatsappType);
								}}
							>
								<Text fontSize={"small"} marginBottom={"5px"}>
									Este número tem Whatsapp?
								</Text>
								<Stack spacing={5} direction="row">
									<Radio
										colorScheme="green"
										value="yes"
										size={"sm"}
									>
										Sim
									</Radio>
									<Radio
										colorScheme="red"
										value="no"
										size={"sm"}
									>
										Não
									</Radio>
								</Stack>
							</RadioGroup>
						</VStack>
					</Flex>

					<FormControl>
						<FormLabel>
							<Text
								fontWeight={"semibold"}
								fontSize={"lg"}
								color={"gray.500"}
							>
								Digite sua mensagem
							</Text>
						</FormLabel>
						<Textarea
							rows={6}
							resize={"none"}
							placeholder="Mensagem..."
							onChange={(e) => {
								setMessage(e.target.value);
							}}
							value={message}
						/>
					</FormControl>
					<Center>
						<Button
							colorScheme="blue"
							onClick={() => {
								sendEmail();
							}}
						>
							Enviar
						</Button>
					</Center>
				</VStack>
			</Flex>
		</>
	);
}
