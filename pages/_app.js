import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

function MyApp({ Component }) {
  return (
    <>
      <Head>
        <meta charSet='utf-8'/>
        <title>My Memories</title>
      </Head>
      <Component />
    </>
  );
}

MyApp.propTypes={
  Component: PropTypes.elementType.isRequired
}

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(MyApp);
