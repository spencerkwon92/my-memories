import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

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

export default MyApp;
