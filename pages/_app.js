import Head from "next/head";
import { useEffect } from "react";

let M;
if (typeof window !== "undefined") {
  M = require("materialize-css");
}

import Layout from "../components/layout/Layout";

import "materialize-css/dist/css/materialize.min.css";

import "../styles/globals.css";

let MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <Layout>
      <Head>
        <title>New Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
