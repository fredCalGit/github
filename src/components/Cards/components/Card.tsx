import { ThemeContext } from "@/pages/_app";
import { User } from "@/types";
import { dateParser } from "@/utils";
import {
  Card as ChakraCard,
  CardBody,
  Heading,
  Image,
  Text,
  Stack,
  CardHeader,
  Flex,
  Spacer,
  Avatar,
  VStack,
} from "@chakra-ui/react";

import React, { useContext } from "react";

interface CardProps {
  user: User;
  isLoading: boolean;
}
export default function Card({ user, isLoading }: CardProps) {
  const { theme } = useContext(ThemeContext);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ChakraCard
      maxW='md'
      maxH='400px'
      bg='bgPrimary'
      color='primary'
      cursor='pointer'
      sx={{
        transition: "all ease-in .5",
        _hover: {
          transform: "translateY(-5px)",
          boxShadow: "5px 5px 10px 5px rgba(0,0,0,0.3)",
        },
        wordBreak: "break-word",
      }}
    >
      <CardHeader p='1rem'>
        <Flex justifyContent='flex-start' alignItems='top' gap='1rem'>
          <Avatar src={user.avatarUrl} size='lg' />
          <Flex flexDirection='column' lineHeight='1.1'>
            <Heading size='md'>{user.name}</Heading>
            {user.login && (
              <Text size='smaller' fontWeight='bold' color='secondary'>
                Login:{" "}
                <span
                  style={{ color: theme.colors.primary, fontWeight: "400" }}
                >
                  {user.login}
                </span>
              </Text>
            )}
            <Flex gap='1rem'>
              {user.repositories?.totalCount && (
                <Text size='smaller' fontWeight='bold' color='secondary'>
                  Repos:{" "}
                  <span
                    style={{ color: theme.colors.primary, fontWeight: "400" }}
                  >
                    {user.repositories.totalCount || "N/A"}
                  </span>
                </Text>
              )}
              {user.createdAt && (
                <Text size='smaller' fontWeight='bold' color='secondary'>
                  Since:{" "}
                  <span
                    style={{ color: theme.colors.primary, fontWeight: "400" }}
                  >
                    {dateParser(user.createdAt)}
                  </span>
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody pt='0' pb='20px'>
        <Stack spacing='0'>
          {user.company && (
            <Flex gap='1rem'>
              <Text size='smaller' fontWeight='bold' color='secondary'>
                Company:{" "}
                <span
                  style={{ color: theme.colors.primary, fontWeight: "400" }}
                >
                  {user.company}
                </span>
              </Text>
            </Flex>
          )}
          {user.location && (
            <Flex gap='1rem'>
              <Text size='smaller' fontWeight='bold' color='secondary'>
                Location:{" "}
                <span
                  style={{ color: theme.colors.primary, fontWeight: "400" }}
                >
                  {user.location}
                </span>
              </Text>
            </Flex>
          )}
          {user.bio && (
            <Flex gap='1rem'>
              <Text size='smaller' fontWeight='bold' color='secondary'>
                About:{" "}
                <span
                  style={{ color: theme.colors.primary, fontWeight: "400" }}
                >
                  {user.bio}
                </span>
              </Text>
            </Flex>
          )}
        </Stack>
      </CardBody>
    </ChakraCard>
  );
}
