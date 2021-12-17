// import "../styles/globals.css";
import "../styles/index.css";
import "../styles/Router.css";
import "../node_modules/antd/dist/antd.css";
import "../components/SearchArea/SearchArea.module.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
