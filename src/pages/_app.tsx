import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { theme } from "@/styles/theme";
import { DebugProvider } from "@/context/Debug";
import { WatchProvider } from "@/context/Watchdog";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <QueryClientProvider client={queryClient}>
        <DebugProvider>
          <WatchProvider>
            <Component {...pageProps} />
          </WatchProvider>
        </DebugProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
