import { Lobster } from 'next/font/google';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });

const Header = () => {
  return (
    <header className="m-0 box-border flex justify-center bg-slate-100 p-0">
      <div className="container flex h-16 items-center justify-between border-b">
        <h1 className={cn(lobster.className, 'text-primary text-4xl')}>
          <Link href="/problems">blanky</Link>
        </h1>
        <div className="flex gap-4">
          <Button variant={'outline'} asChild>
            <Link href="/profile">プロフィール</Link>
          </Button>
          <Button variant={'default'} asChild>
            <Link href="/add">問題を作成する</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
