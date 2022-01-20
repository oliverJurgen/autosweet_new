// import "../styles/globals.css";
import "../styles/index.css";
import "../styles/Router.css";
import "../node_modules/antd/dist/antd.css";
import "../components/SearchArea/SearchArea.module.css";
import Script from "next/script";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import store from "../redux/store";
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
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=UA-214227270"
      />
      <Script strategy="lazyOnload">
        {`
        if(typeof window !== 'undefined'){
          console.log("GA-Loaded")
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
        }

        `}
      </Script>
      <DefaultSeo
        title="Auto Sweet Autos"
        description="Automotive Marketing Agency for Dealerships"
        canonical="https://dev-autosweet.azurewebsites.net/"
        noindex={true}
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
