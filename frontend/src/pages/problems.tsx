import camelcaseKeys from 'camelcase-keys';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import useSWR from 'swr';
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
import { fetcher } from '@/utils';

interface ProblemInterface {
  id: number;
  title: string;
  englishText: string;
  japaneseText: string;
  correctAnswerRate: number;
  blankType: number;
  blankRate: number;
  createdAt: string;
  updatedAt: string;
}

const ProblemsPage: NextPageWithLayout = () => {
  const url = 'http://localhost:3000/api/v1/problems';
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const problems: ProblemInterface[] = camelcaseKeys(data);

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
        <div className="flex justify-center">
          <form className="flex w-3/5">
            <SearchInput
              type="search"
              placeholder="タイトルで検索..."
            ></SearchInput>
            <SearchButton>検索</SearchButton>
          </form>
        </div>
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>英文</TableHead>
              <TableHead>和文</TableHead>
              <TableHead className="w-[100px]">正答率</TableHead>
              <TableHead className="text-right">作成日時</TableHead>
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
                <TableCell>{problem.englishText}</TableCell>
                <TableCell>{problem.japaneseText}</TableCell>
                <TableCell>{problem.correctAnswerRate}</TableCell>
                <TableCell className="text-right">
                  {problem.createdAt}
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
