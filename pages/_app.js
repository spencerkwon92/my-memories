import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ChakraProvider, Container } from "@chakra-ui/react";

import wrapper from "../store/configureStore";

function MyApp({ Component }) {
  return (
    <ChakraProvider>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>My Memories</title>
      </Head>
      <Container maxW="container.lg">
        <Component />
      </Container>
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(MyApp);
