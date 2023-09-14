import {
  Card as CKCard,
  CardBody,
  Stack,
  Heading,
  Text,
  Box,
  Center,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { BsSunFill } from "react-icons/bs";
import { Project } from "@/lib/models";
import { CKCarousel } from "./ck-carousel";

interface CardProps {
  project: Project;
}

const translate = {
  address: "Localidade",
  potency: "Potência instalada",
  estimation: "Estimativa",
};

export const HorizontalCard = ({ project }: CardProps) => {
  const media = (
    <CKCarousel
      cards={(() => {
        const res: string[] = [];
        const cut = project.path.split("public/")[1];

        project.images.forEach((i: any) => {
          res.push(`/${cut}/${i}`);
        });

        return res;
      })()}
      height={["", "14rem", "15rem"]}
      width={["10rem", "15rem", "20rem"]}
    />
  );

  const { meta } = project;
  const metaArray = Object.keys(meta)
    .slice(1, -1)
    .map((key) => {
      const res = [];
      res.push(key);

      // @ts-expect-error
      res.push(meta[key]);

      return res;
    });

  const listItems = [];
  let index = 0;
  for (const m of metaArray) {
    if (m[0] != "extension") {
      listItems.push(
        <ListItem
          w={"fit-content"}
          display={"flex"}
          alignItems={"center"}
          key={index++}
        >
          {/* <ListIcon as={BsSunFill} color='green.500' /> */}
          <Flex w={"fit-content"}>
            <Text m={0} fontSize="small">
              <strong>
                {
                  // @ts-expect-error
                  translate[m[0]]
                }
              </strong>
            </Text>
            <Text fontSize="small">: {`${m[1]}`}</Text>
          </Flex>
        </ListItem>
      );
    }
  }

  const content = (
    <List paddingLeft={1} w={"fit-content"} className={`LIST`}>
      {listItems}
    </List>
  );

  return (
    <CKCard
      className={`CARD`}
      // w={"fit-content"}
      maxW={"700px"}
      _hover={{
        bg: `sun-light.blue`,
        color: "white",
        transition: "0.5s",
      }}
      boxShadow={`#b1aeae 1px 1px 20px 0px`}
    >
      <CardBody className={`CARD-BODY`} w={"fit-content"}>
        <Stack direction={"row"}>
          <Center className={`CENTER`}>
            <Box w={"fit-content"}>{media}</Box>
          </Center>
          <Stack mt="6" spacing="3">
            <Heading size={["sm", "sm", "md"]} w={"fit-content"}>
              {project.meta.displayName == "Expansão"
                ? `${project.meta.extension["name"]} - Extensão`
                : project.meta.displayName}
            </Heading>
            {content}
          </Stack>
        </Stack>
      </CardBody>
    </CKCard>
  );
};
