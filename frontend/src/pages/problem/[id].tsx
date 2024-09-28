import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '@/components/layout';
import { NextPageWithLayout } from '@/pages/_app';

const PrivacyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>id: {id}</title>
        <meta
          name="description"
          content={'英語学習アプリblanky 問題' + id}
        ></meta>
      </Head>
      <section>
        <h1>{'英語学習アプリblanky 問題' + id}</h1>
        <p>aaa</p>
        <p>bbb</p>
      </section>
    </>
  );
};

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PrivacyPage;
