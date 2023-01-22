import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

interface LoadingProps {
  contained?: boolean;
}
export function Loading({ contained = false }: LoadingProps) {
  return (
    <Flex
      w='100vw'
      h={contained ? "100px" : "calc(100vh - 100px)"}
      justifyContent='center'
      alignItems='center'
      bg='bgSecondary'
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  );
}
