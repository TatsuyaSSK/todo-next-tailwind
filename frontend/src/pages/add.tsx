import Head from 'next/head';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';

const problemAddPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>問題追加</title>
        <meta
          name="description"
          content="英語学習アプリblanky 問題追加画面"
        ></meta>
      </Head>
      <section>
        <h1>問題追加</h1>
        <p>問題追加aaa</p>
        <p>問題追加bbb</p>
      </section>
    </>
  );
};

problemAddPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default problemAddPage;
