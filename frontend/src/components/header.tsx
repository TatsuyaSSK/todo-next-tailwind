import { Lobster } from 'next/font/google';
import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { useUserState } from '@/hooks/useGlobalState';
import { cn } from '@/lib/utils';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });

const Header = () => {
  const [user] = useUserState();
  console.log(user);

  return (
    <header className="bg-primary-foreground sticky top-0 z-50 m-0 box-border flex justify-center p-0">
      <div className="container flex h-16 items-center justify-between">
        <h1 className={cn(lobster.className, 'text-primary text-4xl')}>
          <Link href="/problems">blanky</Link>
        </h1>
        {user.isFetched && (
          <>
            {!user.isSignedIn && (
              <div className="flex gap-4">
                <Button variant={'outline'} asChild>
                  <Link href="/sign_in">ログイン</Link>
                </Button>
                <Button variant={'default'} asChild>
                  <Link href="/sign_in">新規登録</Link>
                </Button>
                <ModeToggle />
              </div>
            )}
            {user.isSignedIn && (
              <div className="flex gap-4">
                <Button variant={'outline'} asChild>
                  <Link href="/profile">{user.email}</Link>
                </Button>
                <Button variant={'default'} asChild>
                  <Link href="/add">問題を作成する</Link>
                </Button>
                <ModeToggle />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
