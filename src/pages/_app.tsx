import { createContext, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { lightTheme } from "@/styles/Theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql";

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
