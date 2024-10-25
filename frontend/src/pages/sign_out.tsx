import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { useUserState } from '@/hooks/useGlobalState';

const SignOutPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [, setUser] = useUserState();

  useEffect(() => {
    localStorage.clear();
    setUser({
      id: 0,
      name: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
    });
    router.push('/');
  }, [router, setUser]);

  return <></>;
};

SignOutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SignOutPage;
