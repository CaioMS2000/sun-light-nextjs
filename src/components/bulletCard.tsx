import { Circle, Flex, Text } from "@chakra-ui/react";
import { MouseEvent, ReactNode } from "react";

export interface BulletCardProps {
  children?: ReactNode;
  text: string;
  imgUrl: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function BulletCard({ text, imgUrl, onClick: onClickFunction }: BulletCardProps) {
  return (
    <>
      <Flex
        bg={"sun-light.yellow"}
        boxShadow={"0px 0px 6px #000000d4"}
        className="bullet-card"
        borderRadius={"99px"}
        w={"fit-content"}
        align={"center"}
        paddingRight={"50px"}
        paddingLeft={"10px"}
        paddingBlock={"10px"}
        gap={5}
        justify={"space-between"}
        onClick={onClickFunction}
      >
        <Circle
          bg={"#fff"}
          size={["50px", "100px", "160px"]}
          backgroundImage={
            `url(${imgUrl})`
          }
          backgroundSize={"cover"}
        />
        {/* <Flex> */}
          <Text
            m={0}
            w={["100px", "300px", "500px"]}
            // marginLeft={"50px"}
            className="bullet-card-text"
            fontSize={["sm", "lg", "3xl"]}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            {text}
          </Text>
        {/* </Flex> */}
      </Flex>
    </>
  );
}
