import Head from 'next/head';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { SearchButton } from '@/components/ui/searchButton';
import { SearchInput } from '@/components/ui/searchInput';

const ProblemsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>問題一覧</title>
        <meta name="keywords" content="english study"></meta>
        <meta
          name="description"
          content="好きなフレーズから英語の穴埋め問題を作成、解くことができるアプリです"
        ></meta>
      </Head>
      <div className="flex flex-col justify-center">
        <form className="mt-5 flex">
          <SearchInput
            type="search"
            placeholder="タイトルで検索..."
          ></SearchInput>
          <SearchButton>検索</SearchButton>
        </form>
        <table className="mt-5">
          <thead>
            <tr className="bg-green-600 text-white">
              <th>タイトル</th>
              <th>詳細</th>
              <th>種類</th>
              <th>正答率</th>
              <th>作成日</th>
              <th>更新日</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>test1</td>
              <td>detail1</td>
              <td>random</td>
              <td>75%</td>
              <td>2024/09/12</td>
              <td>2024/09/14</td>
            </tr>
            <tr>
              <td>test2</td>
              <td>detail2</td>
              <td>noun</td>
              <td>70%</td>
              <td>2024/09/12</td>
              <td>2024/09/14</td>
            </tr>
            <tr>
              <td>test3</td>
              <td>detail3</td>
              <td>random</td>
              <td>40%</td>
              <td>2024/09/12</td>
              <td>2024/09/14</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

ProblemsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProblemsPage;
