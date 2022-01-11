// import "../styles/globals.css";
import "../styles/index.css";
import "../styles/Router.css";
import "../node_modules/antd/dist/antd.css";
import "../components/SearchArea/SearchArea.module.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-N37ZXGM4J6"
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
        `}
      </Script>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
