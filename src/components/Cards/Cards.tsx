import React from "react";
import { Flex, Grid, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import Card from "./components/Card";
import { User } from "@/types";

interface CardsProps {
  users: User[] | null;
  isLoading: boolean;
}
export default function Cards({ users, isLoading }: CardsProps) {
  if (isLoading)
    return (
      <Flex w='100vw' h='full' justifyContent='center' alignItems='center'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    );
  return (
    <SimpleGrid
      minChildWidth='300px'
      spacing='20px'
      p='2rem'
      bg='bgSecondary'
      h='full'
    >
      {users &&
        users.map((user) => {
          return (
            <Card
              key={user.id || `cardKey-${Math.random()}`}
              user={user}
              isLoading={isLoading}
            />
          );
        })}
    </SimpleGrid>
  );
}
