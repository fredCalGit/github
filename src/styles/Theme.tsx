import { extendTheme } from "@chakra-ui/react";

export const darkTheme = extendTheme({
  label: "dark",
  colors: {
    bgPrimary: "#171923",
    bgSecondary: "#2D3748",
    primary: "#8AAEC0",
    secondary: "#2A67A3",
    logo: "#fff",
  },
});

export const lightTheme = extendTheme({
  label: "light",
  colors: {
    bgPrimary: "#fff",
    bgSecondary: "#2A67A3",
    primary: "#171923",
    secondary: "#2D3748",
    logo: "#000",
  },
});
