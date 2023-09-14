import { MutableRefObject, ReactNode } from "react";
import { Card, CardHeader, CardBody, CardFooter, Text, Flex } from "@chakra-ui/react";

export interface StylishCardProps {
	children?: ReactNode;
	title: string;
	text: string|ReactNode;
	color?: string;
	imgUrl: string;
	reference: MutableRefObject<any>;
}

export default function StylishCard({ title, text, imgUrl, reference, color }: StylishCardProps) {
	title = title || "HEADER";
	text = text || "TEXT";
	color = color || "blue";

	return (
		<>
			<Card
				bg={"#000"}
				overflow={"hidden"}
				fontWeight={"bold"}
				color={"#fff"}
                borderRadius={'20px'}
                ref={reference}
			>
				<CardHeader
					bg={color}
					textAlign={"center"}
					h={"fit-content"}
					p={"0.7rem 0.5rem"}
				>
					<Text m={0} fontSize={['sm', 'xl', '3xl']}>{title}</Text>
				</CardHeader>
				<CardBody
					textAlign={"center"}
					backgroundImage={`url(${imgUrl})`}
					backgroundSize={"cover"}
                    p={0}
				>
					<Flex
                    justify={'center'}
                    bg={'#00000080'}
                    p={"2rem 0.5rem"}
                    >
                        <Text m={0} fontSize={['sm', 'lg', '2xl']}>{text}</Text>
                    </Flex>
				</CardBody>
			</Card>
		</>
	);
}
