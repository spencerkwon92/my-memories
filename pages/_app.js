import React,{useState, useEffect} from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { ChakraProvider, Container } from "@chakra-ui/react";
import {useRouter} from 'next/router'
import PageLoadingIndicator from "../components/PageLoadingIndicator";

import wrapper from "../store/configureStore";

function MyApp({ Component }) {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const router = useRouter()

  useEffect(()=>{
    router.events.on("routeChangeStart", () => {
      setIsPageLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setIsPageLoading(false);
    });

    router.events.on("routeChangeError", () => {
      setIsPageLoading(false);
    });

    return()=>{
      router.events.off("routeChangeStart", () => {
        setIsPageLoading(true);
      });

      router.events.off("routeChangeComplete", () => {
        setIsPageLoading(false);
      });

      router.events.off("routeChangeError", () => {
        setIsPageLoading(false);
      });
    }
  },[])



  return (
    <ChakraProvider>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>My Memories</title>
      </Head>
      <Container maxW="container.lg">
        {isPageLoading ? <PageLoadingIndicator /> : <Component />}
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
