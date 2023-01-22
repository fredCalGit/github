import React from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Waypoint } from "react-waypoint";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { Card, Loading } from "./components";

interface CardsProps {
  queryString: string;
}
export function Cards({ queryString }: CardsProps) {
  const {
    data: { users, isLoading, error, networkStatus },
    actions: { handleScroll },
  } = useFetchUsers({ queryString });

  if (isLoading && networkStatus !== 3) return <Loading />;
  return (
    <Flex
      className='cards'
      flexDirection='column'
      h='full'
      maxH='calc(100vh - 100px)'
      w='full'
      bg='bgSecondary'
      p='2rem'
      overflowY='scroll'
      overflowX='hidden'
    >
      <SimpleGrid minChildWidth='300px' spacing='20px' h='full' mb='1rem'>
        {users &&
          users.map((user, i) => {
            if (i === users.length - 10) {
              return (
                <div key={`cardKey-${Math.random()}-${user.id}`}>
                  <Card user={user} isLoading={isLoading} />
                  <Waypoint onEnter={() => handleScroll(i)} />
                </div>
              );
            } else {
              return (
                <Card
                  user={user}
                  isLoading={isLoading}
                  key={`cardKey-${Math.random()}-${user.id}`}
                />
              );
            }
          })}
      </SimpleGrid>
      {networkStatus === 3 && <Loading contained={true} />}
    </Flex>
  );
}
