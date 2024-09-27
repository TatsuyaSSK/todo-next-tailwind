import Head from 'next/head';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';

const profilePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>プロフィール</title>
        <meta
          name="description"
          content="英語学習アプリblanky プロフィール"
        ></meta>
      </Head>
      <section>
        <h1>プロフィール</h1>
        <p>プロフィールaaa</p>
        <p>プロフィールbbb</p>
      </section>
    </>
  );
};

profilePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default profilePage;
