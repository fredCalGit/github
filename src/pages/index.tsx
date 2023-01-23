import Head from "next/head";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { Cards, Navbar } from "@/components";
// import { GetStaticProps } from "next";
// import { client } from "@/graphql";
// import { gql } from "@apollo/client";

export default function Home() {
  const [queryString, setQueryString] = useState("");

  return (
    <>
      <Head>
        <title>Github Users</title>
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

// export const getStaticProps: GetStaticProps = async () => {
//   const { data, loading } = await client.query({
//     query: gql`
//       query ExampleQuery(
//         $query: String!
//         $type: SearchType!
//         $first: Int
//         $after: String
//       ) {
//         search(query: $query, type: $type, first: $first, after: $after) {
//           edges {
//             cursor
//             node {
//               ... on User {
//                 avatarUrl
//                 bio
//                 company
//                 createdAt
//                 email
//                 id
//                 location
//                 name
//                 login
//                 repositories {
//                   totalCount
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//     variables: {
//       query: "",
//       type: "USER",
//       after: null,
//       first: 20,
//     },
//   });
//   return {
//     props: {
//       data: JSON.stringify(data),
//       loading,
//     },
//     revalidate: 10,
//   };
// };
