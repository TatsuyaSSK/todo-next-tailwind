import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import useSWR from 'swr';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

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
  const [problems, setProblems] = useState<ProblemInterface[]>([]);
  const [meta, setMeta] = useState<PageMetaInterface>({
    currentPage: 1,
    totalPages: 1,
  });
  const url = `http://localhost:3000/api/v1/problems?page=${page}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

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
          <form className="flex w-4/5 lg:w-3/5">
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
              <TableHead>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className="w-2/5 justify-start"
                >
                  タイトル
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="flex items-center">英文</TableHead>
              <TableHead>和文</TableHead>
              <TableHead className="w-[100px]">正答率</TableHead>
              <TableHead>作成日時</TableHead>
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
                      <Button variant={'ghost'} className="h-8 w-8 p-0">
                        <span className="sr-only">open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4"></DotsHorizontalIcon>
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
                      href={`/problems?page=${meta.currentPage - 1}`}
                    />
                  )}
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    key={1}
                    href={`/problems?page=1`}
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
                      href={`/problems?page=${meta.currentPage - 1}`}
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
                        href={`/problems?page=${meta.currentPage}`}
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
                      href={`/problems?page=${meta.currentPage + 1}`}
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
                      href={`/problems?page=${meta.totalPages}`}
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
                      href={`/problems?page=${meta.currentPage + 1}`}
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
