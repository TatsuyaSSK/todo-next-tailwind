import Head from 'next/head';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const TermsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>利用規約</title>
        <meta
          name="description"
          content="英語学習アプリblanky 利用規約一覧"
        ></meta>
      </Head>
      <section>
        <h1>利用規約</h1>
        <p>利用規約aaa</p>
        <p>利用規約bbb</p>
      </section>
    </>
  );
};

TermsPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default TermsPage;
