import camelcaseKeys from 'camelcase-keys';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import useSWR from 'swr';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NextPageWithLayout } from '@/pages/_app';
import { fetcher } from '@/utils';
import { useFieldArray, useForm } from 'react-hook-form';
import Link from 'next/link';

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

interface BlankIndexInterface {
  index: number;
}

const PrivacyPage: NextPageWithLayout = () => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [isCorrects, setIsCorrects] = useState<{ [key: string]: boolean }>({});
  const [inputResults, setInputResults] = useState<{ [key: string]: string }>(
    {},
  );
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: { [key: string]: string }) => {
    setIsButtonDisable(true);
    setIsAnswerVisible(true);
    setIsCorrects(checkAnswer(Object.values(data)));
    setInputResults(data);
  };
  useEffect(() => {}, [inputResults]);
  const router = useRouter();
  const { id } = router.query;

  const problemUrl = `http://localhost:3000/api/v1/problems/`;
  const { data, error } = useSWR(id ? problemUrl + id : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const problem = camelcaseKeys(data.problem) satisfies ProblemInterface;
  const englishTextList: string[] = problem.englishText.split(' ');
  const blankIndices: number[] = data.blank_indices.map(
    (item: BlankIndexInterface) => item.index,
  );

  const checkAnswer = (userAnswer: string[]) => {
    const correctAnswer: string[] = blankIndices.map(
      (index: number) => englishTextList[index],
    );
    const result: { [key: string]: boolean } = {};
    correctAnswer.forEach((ans: string, i: number) =>
      ans === userAnswer[i]
        ? (result[blankIndices[i]] = true)
        : (result[blankIndices[i]] = false),
    );
    return result;
  };

  const total_count = Object.keys(isCorrects).length;
  const correct_count = Object.values(isCorrects).reduce(
    (count, value) => count + (value === true ? 1 : 0),
    0,
  );

  return (
    <>
      <Head>
        <title>id: {id}</title>
        <meta
          name="description"
          content={'英語学習アプリblanky 問題' + id}
        ></meta>
      </Head>
      <div className="flex justify-center">
        <h1 className="text-3xl text-primary">{problem.title}</h1>
      </div>
      {!isAnswerVisible && (
        <section className="mt-10 px-20 border-2 border-border py-10 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2 className="text-xl">英文</h2>
              <p className="leading-10 text-lg mt-2">
                {englishTextList.map((word: string, i: number) =>
                  blankIndices.includes(i) ? (
                    <input
                      key={i}
                      type="text"
                      {...register(`blank${i}`)}
                      className="h-8 rounded-md border border-green-800 bg-transparent mr-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-semibold text-primary pl-2"
                      autoComplete="off"
                      size={englishTextList[i].length + 3}
                    />
                  ) : (
                    `${word} `
                  ),
                )}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-xl">和訳</h2>
              <p className="leading-10 text-lg mt-2">{problem.japaneseText}</p>
            </div>
            <div className="mt-10 flex justify-center">
              <Button type="submit" disabled={isButtonDisable}>
                回答する
              </Button>
            </div>
          </form>
        </section>
      )}
      {isAnswerVisible && (
        <section className="mt-10 px-20 border-2 border-border py-10 rounded-md">
          <div>
            <h2 className="text-xl">回答</h2>
            <p className="leading-10 text-lg">
              {englishTextList.map((word: string, i: number) =>
                blankIndices.includes(i) ? (
                  <strong
                    key={i}
                    className={
                      isCorrects[i]
                        ? 'text-primary mr-2'
                        : 'text-destructive mr-2'
                    }
                  >
                    {inputResults[`blank${i}`] || '( )'}
                  </strong>
                ) : (
                  `${word} `
                ),
              )}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl">正解</h2>
            <p className="leading-10 text-lg">
              {englishTextList.map((word: string, i: number) =>
                blankIndices.includes(i) ? (
                  <strong key={i} className="text-primary">
                    {word}{' '}
                  </strong>
                ) : (
                  `${word} `
                ),
              )}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl">正答率</h2>
            <div className="flex items-center">
              <p>
                <strong className="text-3xl text-primary">
                  {Math.floor((correct_count / total_count) * 100)}
                </strong>
              </p>
              %
              <p className="ml-2">
                （ {correct_count}問中{total_count}問正解 ）
              </p>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Button variant={'default'} asChild>
              <Link href="/problems">問題一覧へ戻る</Link>
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PrivacyPage;
