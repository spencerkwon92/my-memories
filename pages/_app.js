import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Head>
              <meta charSet="utf-8" />
              <link rel="icon" href="/favicon.ico" />
              <title>My Memories</title>
            </Head>
            <Container maxW="container.lg">
              <Component {...pageProps} />
            </Container>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
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
