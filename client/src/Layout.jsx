import React from 'react';
import Head from "next/head";
import styled from "@emotion/styled";
import GlobalStyles from "./prebuilt/GlobalStyles";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51H2238Io92aJXnNLI0stj6w2KeFwXcGkyjh67PGc6pD5oeHSdxCK0oFE4ULITT9xaMl5bvNZvSxdE1JRUnSOqY1a001MKPGHuq");


const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};
export default Layout;
