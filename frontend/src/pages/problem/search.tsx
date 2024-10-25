import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { z } from 'zod';
import { NextPageWithLayout } from '../_app';
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

interface Problem {
  id: number;
  title: string;
  english_text: string;
  japanese_text: string;
}

interface SearchResultInterface {
  problems: Problem[];
}

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const keywords = 'q' in router.query ? router.query.q : '';
  const transformKeyword = (): string => {
    if (!keywords) {
      return '';
    }
    if (typeof keywords === 'string') {
      return keywords;
    }
    return keywords[0];
  };
  const defaultValue = transformKeyword();
  const url = `http://localhost:3000/api/v1/problem/search?q=${defaultValue}`;
  const { data, error, isLoading } = useSWR<SearchResultInterface>(
    url,
    fetcher,
  );

  const formSchema = z.object({
    search: z
      .string()
      .min(1, {
        message: '必須項目です',
      })
      .max(40, {
        message: '40文字以内で入力してください',
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: defaultValue,
    },
  });

  if (error) return <div>読み込みに失敗しました</div>;
  if (isLoading || !data) return <div>ローディング中...</div>;

  const omitText = (text: string) => (len: number) => (ellipsis: string) =>
    text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/problem/search?q=${values.search}`);
  }

  return (
    <>
      <Head>
        <title>検索結果</title>
        <meta name="description" content="英語学習アプリblanky 検索結果"></meta>
      </Head>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-4/5 lg:w-3/5"
          >
            <Controller
              control={form.control}
              name="search"
              render={({ field }) => (
                <SearchInput
                  {...field}
                  type="search"
                  placeholder="タイトルで検索..."
                />
              )}
            />
            <SearchButton type="submit">検索</SearchButton>
          </form>
        </div>
        <h1>検索結果(上位10件)</h1>
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead className="flex items-center">英文</TableHead>
              <TableHead>和文</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell className="font-medium">
                  <Link href={'/problem/' + problem.id}>
                    <div className="w-80">{problem.title}</div>
                  </Link>
                </TableCell>
                <TableCell>
                  {omitText(problem.english_text)(40)('...')}
                </TableCell>
                <TableCell>
                  {omitText(problem.japanese_text)(40)('...')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
