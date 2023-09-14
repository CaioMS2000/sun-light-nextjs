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

export const Card = ({ project }: CardProps) => {
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
      height={["20rem", "14rem", "15rem"]}
      width={["20rem", "20rem", "30rem"]}
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
            <Text m={0} fontSize={["sm", "sm", "md"]}>
              <strong>
                {
                  // @ts-expect-error
                  translate[m[0]]
                }
              </strong>
            </Text>
            <Text fontSize={["sm", "sm", "md"]}>: {`${m[1]}`}</Text>
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
      minW={"fit-content"}
      _hover={{
        bg: `sun-light.blue`,
        color: "white",
        transition: "0.5s",
      }}
      boxShadow={`#b1aeae 1px 1px 20px 0px`}
    >
      <CardBody className={`CARD-BODY`}>
        <Stack>
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
