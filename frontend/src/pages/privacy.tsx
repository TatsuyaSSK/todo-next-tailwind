import Head from 'next/head';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';

const PrivacyPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>プライバシーポリシー</title>
        <meta
          name="description"
          content="英語学習アプリblanky プライバシーポリシー一覧"
        ></meta>
      </Head>
      <section>
        <h1>プライバシーポリシー</h1>
        <p>プライバシーポリシーaaa</p>
        <p>プライバシーポリシーbbb</p>
      </section>
    </>
  );
};

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PrivacyPage;
