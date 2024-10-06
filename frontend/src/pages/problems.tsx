import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { z } from 'zod';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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

interface PageMetaInterface {
  currentPage: number;
  totalPages: number;
}

const ProblemsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const page = 'page' in router.query ? Number(router.query.page) : 1;
  const sort = 'sort' in router.query ? router.query.sort : 'created_at';
  const direction =
    'direction' in router.query ? router.query.direction : 'DESC';
  const [problems, setProblems] = useState<ProblemInterface[]>([]);
  const [meta, setMeta] = useState<PageMetaInterface>({
    currentPage: 1,
    totalPages: 1,
  });
  const url = `http://localhost:3000/api/v1/problems?page=${page}&sort=${sort}&direction=${direction}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
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
      search: '',
    },
  });

  useEffect(() => {
    if (data) {
      setProblems(camelcaseKeys(data.problems));
      setMeta(camelcaseKeys(data.meta));
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const deleteProblem = async (id: number) => {
    const url = `http://localhost:3000/api/v1/problems/${id}`;
    await axios({ method: 'DELETE', url });
    /*
    NOTE: 削除したときにページごとの数より少なくなる（リロードすればデータが再取得されて解消される）
    挙動として、削除したら現在のpage番号でデータを再取得しにいくべきなんだろうか。
    */
    setProblems((prevProblems) => {
      return prevProblems.filter((problem) => {
        return problem.id !== id;
      });
    });
  };

  const omitText = (text: string) => (len: number) => (ellipsis: string) =>
    text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/problem/search?q=${values.search}`);
  }

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
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className="w-2/5 justify-start"
                  asChild
                >
                  <Link
                    href={`/problems?page=1&sort=title&direction=${direction === 'DESC' ? 'ASC' : 'DESC'}`}
                  >
                    タイトル
                    <CaretSortIcon className="ml-2 size-4" />
                  </Link>
                </Button>
              </TableHead>
              <TableHead className="flex items-center">英文</TableHead>
              <TableHead>和文</TableHead>
              <TableHead className="w-[100px]">
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link
                    href={`/problems?page=1&sort=correct_answer_rate&direction=${direction === 'DESC' ? 'ASC' : 'DESC'}`}
                  >
                    正答率
                    <CaretSortIcon className="ml-2 size-4" />
                  </Link>
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className="w-3/5 justify-start"
                  asChild
                >
                  <Link
                    href={`/problems?page=1&sort=created_at&direction=${direction === 'DESC' ? 'ASC' : 'DESC'}`}
                  >
                    作成日時
                    <CaretSortIcon className="ml-2 size-4" />
                  </Link>
                </Button>
              </TableHead>
              <TableHead className="text-right"></TableHead>
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
                <TableCell>
                  {omitText(problem.englishText)(40)('...')}
                </TableCell>
                <TableCell>
                  {omitText(problem.japaneseText)(40)('...')}
                </TableCell>
                <TableCell>{problem.correctAnswerRate}</TableCell>
                <TableCell>{problem.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={'ghost'} className="size-8 p-0">
                        <span className="sr-only">open menu</span>
                        <DotsHorizontalIcon className="size-4"></DotsHorizontalIcon>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => deleteProblem(problem.id)}
                      >
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {meta.totalPages &&
          meta.currentPage >= 1 &&
          meta.currentPage <= meta.totalPages && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  {meta.currentPage > 1 && (
                    <PaginationPrevious
                      href={
                        `/problems?page=${meta.currentPage - 1}` +
                        `&sort=${sort}&direction=${direction}`
                      }
                    />
                  )}
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    key={1}
                    href={
                      `/problems?page=1` +
                      `&sort=${sort}&direction=${direction}`
                    }
                    isActive={meta.currentPage === 1 ? true : false}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {meta.currentPage > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {meta.currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      key={meta.currentPage - 1}
                      href={
                        `/problems?page=${meta.currentPage - 1}` +
                        `&sort=${sort}&direction=${direction}`
                      }
                    >
                      {meta.currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {meta.currentPage !== 1 &&
                  meta.currentPage !== meta.totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        key={meta.currentPage}
                        href={
                          `/problems?page=${meta.currentPage}` +
                          `&sort=${sort}&direction=${direction}`
                        }
                        isActive
                      >
                        {meta.currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                {meta.currentPage + 1 < meta.totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      key={meta.currentPage + 1}
                      href={
                        `/problems?page=${meta.currentPage + 1}` +
                        `&sort=${sort}&direction=${direction}`
                      }
                    >
                      {meta.currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {meta.totalPages - meta.currentPage > 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {meta.totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      key={meta.totalPages}
                      href={
                        `/problems?page=${meta.totalPages}` +
                        `&sort=${sort}&direction=${direction}`
                      }
                      isActive={
                        meta.currentPage === meta.totalPages ? true : false
                      }
                    >
                      {meta.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  {meta.currentPage !== meta.totalPages && (
                    <PaginationNext
                      href={
                        `/problems?page=${meta.currentPage + 1}` +
                        `&sort=${sort}&direction=${direction}`
                      }
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
      </div>
    </>
  );
};

ProblemsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProblemsPage;
