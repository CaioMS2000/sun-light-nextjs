import { Box, Container, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface DebugProps {
  children?: ReactNode;
}

export default function Debug({ children }: DebugProps) {
    const breakpointValue = useBreakpointValue({
        base: "small",
        sm: "medium",
        md: "large",
        lg: "xl",
        xl: "xxl",
      });

  return (
    <>
      <Container
        // pos={"absolute"}
        pos={"fixed"}
        zIndex={50}
        background={"#000"}
        color={"#fff"}
        top={'80vh'}
        maxW={"20vw"}
        // textAlign={"center"}
        centerContent
      >
        <Box>{"DEBUG"}</Box>
        <Box>
            breakPoint: {useBreakpointValue({
                  base: "base",
                  md: "md",
                  lg: "lg",
                  xl: "xl",
                })}
        </Box>
        <Box>Cards: {breakpointValue}</Box>
      </Container>
    </>
  );
}
