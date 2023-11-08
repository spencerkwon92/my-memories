import React, { useState, useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import PageLoadingIndicator from "../components/layout/PageLoadingIndicator";
import wrapper from "../store/configureStore";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  const [isPageLoading, setIsPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsPageLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setIsPageLoading(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setIsPageLoading(true);
      });

      router.events.off("routeChangeComplete", () => {
        setIsPageLoading(false);
      });
    };
  }, []);

  return (
    <ChakraProvider>
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <title>My Memories</title>
        </Head>
        <Container maxW="container.lg">
          {isPageLoading ? (
            <PageLoadingIndicator />
          ) : (
            <Component {...pageProps} />
          )}
        </Container>
      </Provider>
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default MyApp;
// export default wrapper.withRedux(MyApp);
