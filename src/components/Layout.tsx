import Head from "next/head";
import React from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>MyFursona</title>
        <meta
          name="description"
          content="A place where users can manage their fursonas!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
          <Header />
          {children}</div>
    </>
  );
}
