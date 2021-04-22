import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import NavBar from "../components/Layout/NavBar";
import theme from "../styles/theme";
import { Container } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavBar />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
