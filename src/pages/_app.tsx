import { createContext, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { lightTheme } from "@/styles/Theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql";

// client
//   .query({
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
//       query: "fred",
//       type: "USER",
//       after: "Y3Vyc29yOjQx",
//       first: 20,
//     },
//   })
//   .then((result) => console.log(result));

export const ThemeContext = createContext<Record<string, any>>(lightTheme);

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Record<string, any>>(lightTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </ThemeContext.Provider>
  );
}
