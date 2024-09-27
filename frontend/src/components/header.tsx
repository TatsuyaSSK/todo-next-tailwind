import { Lobster } from 'next/font/google';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });

const Header = () => {
  return (
    <header className="container flex h-16 items-center border-b pl-4">
      <h1 className={cn(lobster.className, 'text-primary text-3xl')}>
        <Link href="/">blanky</Link>
      </h1>
      <Button>問題を作成する</Button>
    </header>
  );
};

export default Header;
