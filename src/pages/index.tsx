import Head from "next/head";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { Cards, Navbar } from "@/components";

export default function Home() {
  const [queryString, setQueryString] = useState("");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Find Github Users' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        <Container
          maxW='100vw'
          minHeight='100vh'
          p='0'
          bg='blue.500'
          m='0'
          overflowY='hidden'
        >
          <Navbar setQueryString={setQueryString} />
          <Cards queryString={queryString} />
        </Container>
      </main>
    </>
  );
}
