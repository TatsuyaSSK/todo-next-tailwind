import Head from 'next/head';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { SearchButton } from '@/components/ui/searchButton';
import { SearchInput } from '@/components/ui/searchInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

const problems = [
  {
    id: 1,
    title: 'オバマ大統領のスピーチ',
    detail: 'ノーベル平和賞受賞後にオバマ大統領がスピーチした内容の一部',
    correct_answer_rate: '75%',
    created_at: '2024/09/18',
  },
  {
    id: 2,
    title: 'オバマ大統領のスピーチ',
    detail: 'ノーベル平和賞受賞後にオバマ大統領がスピーチした内容の一部',
    correct_answer_rate: '75%',
    created_at: '2024/09/18',
  },
  {
    id: 3,
    title: 'オバマ大統領のスピーチ',
    detail: 'ノーベル平和賞受賞後にオバマ大統領がスピーチした内容の一部',
    correct_answer_rate: '75%',
    created_at: '2024/09/18',
  },
  {
    id: 4,
    title: 'オバマ大統領のスピーチ',
    detail: 'ノーベル平和賞受賞後にオバマ大統領がスピーチした内容の一部',
    correct_answer_rate: '75%',
    created_at: '2024/09/18',
  },
  {
    id: 5,
    title: 'オバマ大統領のスピーチ',
    detail: 'ノーベル平和賞受賞後にオバマ大統領がスピーチした内容の一部',
    correct_answer_rate: '75%',
    created_at: '2024/09/18',
  },
];

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
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">タイトル</TableHead>
              <TableHead className="w-[800px]">詳細</TableHead>
              <TableHead>正答率</TableHead>
              <TableHead className="text-right">作成日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell className="font-medium">
                  <Link href={'/problem/' + problem.id}>
                    <div className="w-80">{problem.title}</div>
                  </Link>
                </TableCell>
                <TableCell>{problem.detail}</TableCell>
                <TableCell>{problem.correct_answer_rate}</TableCell>
                <TableCell className="text-right">
                  {problem.created_at}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

ProblemsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProblemsPage;
