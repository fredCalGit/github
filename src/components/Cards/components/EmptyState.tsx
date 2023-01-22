import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

export function EmptyState() {
  return (
    <Flex
      w='100vw'
      h='calc(100vh - 100px)'
      justifyContent='center'
      alignItems='center'
      bg='bgSecondary'
    >
      <Heading color='secondary'>Oops, it seems no users were found!</Heading>
    </Flex>
  );
}
