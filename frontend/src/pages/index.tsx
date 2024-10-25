import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>blanky</title>
        <meta name="keywords" content="english study"></meta>
        <meta name="description" content="英語学習アプリblanky"></meta>
      </Head>
      <section className="flex items-start pt-10">
        <div className="w-1/2">
          <h1 className="text-primary text-4xl font-bold">
            オリジナルの英語問題を瞬時に作成
          </h1>
          <p className="mt-8">
            blankyは、英語の文章をアップロードするだけであなただけのオリジナルの英語問題を作成することができるサービスです。
          </p>
          <p className="mt-4">
            興味のある文章を使って英語を学習することで、あなたの英語学習を促進します。
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant={'default'} asChild>
              <Link href="/sign_up">新規登録する</Link>
            </Button>
          </div>
        </div>
        <div className="w-1/2">
          <Image
            src="/hero.png"
            width={0}
            height={0}
            alt="メインビジュアル"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </section>
      <Separator className="my-8" />
      <section className="mt-8">
        <div>
          <h2 className="text-center text-2xl font-semibold">
            たったの3stepで学習をスタートできます
          </h2>
        </div>
        <div className="mt-16 flex items-start">
          <div className="flex w-1/2 justify-center">
            <Image
              src="/undraw_Add_files_re_v09g.svg"
              width={0}
              height={0}
              alt="画像1"
              sizes="100vw"
              style={{ width: '280px', height: 'auto' }}
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-primary text-xl font-semibold">
              学習に使用したい英文をアップロード
            </h3>
            <p className="mt-4">
              好きな小説の一節、好きなハリウッド俳優の独占インタビューなど、あなたが学習に使いたい英文をコピー、アップロードしてください
            </p>
          </div>
        </div>
        <div className="mt-8 flex items-start">
          <div className="w-1/2">
            <h3 className="text-primary text-xl font-semibold">
              問題形式を選択
            </h3>
            <p className="mt-4">
              名詞だけを覚えたい、形容詞を集中的に勉強したい。そんな要望に合わせ、英語問題をどのような形式で作成するか指定することができます
            </p>
          </div>
          <div className="flex w-1/2 justify-center">
            <Image
              src="/undraw_check_boxes_m3d0.svg"
              width={0}
              height={0}
              alt="画像2"
              sizes="100vw"
              style={{ width: '280px', height: 'auto' }}
            />
          </div>
        </div>
        <div className="mt-8 flex items-start">
          <div className="flex w-1/2 justify-center">
            <Image
              src="/undraw_studying_s3l7.svg"
              width={0}
              height={0}
              alt="画像3"
              sizes="100vw"
              style={{ width: '280px', height: 'auto' }}
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-primary text-xl font-semibold">
              作成したオリジナルの穴埋め問題に取り組む
            </h3>
            <p className="mt-4">
              問題を作成したら、早速作成した問題に取り組みましょう。和訳もついているので、参考にしながら解き進めることができます
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default IndexPage;
