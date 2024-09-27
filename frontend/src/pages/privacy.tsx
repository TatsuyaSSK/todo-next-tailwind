import Head from 'next/head';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

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
  return <>{page}</>;
};

export default PrivacyPage;
