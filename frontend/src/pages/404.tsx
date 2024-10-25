import Link from 'next/link';
import { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-7xl">404</h1>
      <p className="mt-4">
        このページは削除されているか、URLが間違っている可能性があります。
      </p>
      <Button className="mt-10" variant={'outline'} asChild>
        <Link href="/">トップへ戻る</Link>
      </Button>
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotFoundPage;
