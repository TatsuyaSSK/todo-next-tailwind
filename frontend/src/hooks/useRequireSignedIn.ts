import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useToast } from './use-toast';
import { useUserState } from './useGlobalState';

export function useRequireSignedIn() {
  const router = useRouter();
  const [user] = useUserState();
  const { toast } = useToast();

  useEffect(() => {
    if (user.isFetched && !user.isSignedIn) {
      toast({
        description: 'サインインしてください',
      });
      router.push('/sign_in');
    }
  }, [user, router, toast]);
}
