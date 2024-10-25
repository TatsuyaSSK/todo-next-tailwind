import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta property="og:title" content="blanky" />
        <meta
          property="og:description"
          content="blankyは簡単に自作の英語穴埋め問題が作れるアプリです"
        />
        <meta property="og:image" content="/ogp-cover.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
