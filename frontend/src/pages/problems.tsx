import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/components/layout';

const ProblemsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>英語学習アプリblanky 問題一覧</title>
        <meta name="keywords" content="english study"></meta>
        <meta
          name="description"
          content="好きなフレーズから英語の穴埋め問題を作成、解くことができるアプリです"
        ></meta>
      </Head>
      <Layout>
        <div className="flex justify-center">
          <div>
            <form className="mt-5 flex">
              <input
                type="search"
                className="grow rounded-s bg-gray-200 pl-2"
                placeholder="タイトルで検索"
              />
              <button
                type="submit"
                className="rounded-e bg-blue-700 px-2 py-1 font-medium text-white hover:bg-blue-800"
              >
                検索
              </button>
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
        </div>
      </Layout>
    </>
  );
};

export default ProblemsPage;
