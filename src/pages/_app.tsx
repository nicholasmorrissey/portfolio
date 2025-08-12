import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nick Morrissey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
