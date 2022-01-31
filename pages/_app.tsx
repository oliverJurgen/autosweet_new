// import "../styles/globals.css";
import { useEffect } from "react";
import "../styles/index.css";
import "../styles/Router.css";
import "../node_modules/antd/dist/antd.css";
import "../components/SearchArea/SearchArea.module.css";
// import Script from "next/script";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import TagManager from "react-gtm-module";
import { Provider } from "react-redux";
import store from "../redux/store";
import isStaging from "utils/isStaging";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  console.log({ gA: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-PR9FW3P" });
  }, []);

  return (
    <>
      <DefaultSeo
        title="Auto Sweet Autos"
        description="Automotive Marketing Agency for Dealerships"
        canonical="https://dev-autosweet.azurewebsites.net/"
        noindex={isStaging() && true}
        nofollow={isStaging() && true}
        openGraph={{
          type: "website",
          url: "https://dev-autosweet.azurewebsites.net/",
          site_name: "Auto Sweet Autos",
          description: "Automotive Marketing Agency for Dealerships",
          images: [
            {
              url: "/assets/img/icons/AutosweetAUTOS_Final-1png-03.png",
              width: 400,
              height: 300,
              alt: "AutoSweet Logo",
              type: "image/png",
            },
          ],
        }}
      />
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
