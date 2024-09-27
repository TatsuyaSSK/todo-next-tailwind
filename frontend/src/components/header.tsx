import { Lobster } from 'next/font/google';
import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from '@/components/MoonToggle';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="m-0 box-border flex justify-center p-0">
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
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
