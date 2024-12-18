import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Lobster } from 'next/font/google';
import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserState } from '@/hooks/useGlobalState';
import { cn } from '@/lib/utils';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });

const Header = () => {
  const [user] = useUserState();

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
                  <Link href="/sign_up">新規登録</Link>
                </Button>
                <ModeToggle />
              </div>
            )}
            {user.isSignedIn && (
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'outline'}>{user.email}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/sign_out">サインアウト</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
