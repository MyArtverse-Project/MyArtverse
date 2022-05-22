import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyFursonaApp extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="theme-color" content="#9f03ff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
