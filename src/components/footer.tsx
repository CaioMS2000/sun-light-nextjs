import NextLink from "next/link";
import {
  Flex,
  Image,
  Box,
  Link,
  Stack,
  VStack,
  HStack,
  Text,
  Icon,
  Tag,
  TagLeftIcon,
  TagLabel,
  Divider,
} from "@chakra-ui/react";
import {
  AiFillPhone,
  AiOutlineWhatsApp,
  AiOutlineMail,
  AiOutlineInstagram,
} from "react-icons/ai";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { whatsAppLinks } from "@/_links";

export const Footer = () => {
  return (
    <>
      <HStack
        bg={`sun-light.blue`}
        paddingBlock={`1rem`}
        paddingInline={`1rem`}
      >
        <Box
          w={`fit-content`}
          bg={`white`}
          p={[`1.5rem`, `1.3rem`, `1.5rem`]}
          borderRadius={`10rem`}
        >
          <Image
            src="/images/logo_icon_alpha_sm.png"
            maxW={[`5rem`, `3rem`, `5rem`]}
          />
        </Box>
        <Stack w={`full`} justify={`center`} direction={["column", "row", "row"]} gap={[`1rem`, `2rem`, `3rem`, `10rem`]} color={`white`} fontWeight={`bold`}>
          <Box>
            <Flex justifyContent={`center`}>
                <VStack>
                    <Text marginBottom={0}>Contato</Text>
                    <HStack>
                      <Link as={NextLink} href={`${whatsAppLinks[0]}`} target="_blank">
                        <Icon as={AiOutlineWhatsApp} />
                      </Link>
                      <Link as={NextLink} href="/contato">
                        <Icon as={AiOutlineMail} />
                      </Link>
                      <Link as={NextLink} href="/contato">
                        <Icon as={AiFillPhone} />
                      </Link>
                    </HStack>
                </VStack>
            </Flex>
          </Box>

          <VStack spacing={`0.5rem`}>
            <Text marginBottom={0} justifyContent={`center`}>&copy;Copyright 2023</Text>
            <Stack gap={`0.5rem`} direction={['column', 'row', 'row']}>
              <Text>Sun Light</Text> <Text display={['none', 'block', 'block']}>|</Text>
              <Link
                as={NextLink}
                href="https://www.linkedin.com/in/caio-m-silva-5b42a9209/"
                target="_blank"
              >
                <Text align={`center`}>Caio M. Silva</Text>
              </Link>
            </Stack>
          </VStack>

          <Box>
            <VStack justify={`center`}>
            <Link as={NextLink} href='https://www.instagram.com/sunlightengenhariadosol/' target='_blank'>
                <Tag variant='subtle' colorScheme='facebook'>
                    <TagLeftIcon boxSize='15px' as={AiOutlineInstagram} />
                    <TagLabel>Instagram</TagLabel>
                </Tag>
            </Link>
            </VStack>
          </Box>
        </Stack>
      </HStack>
    </>
  );
};
