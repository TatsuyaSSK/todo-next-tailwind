import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { Button, LoadingButton } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: '必須項目です',
      })
      .max(30, {
        message: '30文字以内で入力してください',
      })
      .email({ message: '不適切なフォーマットです' }),
    password: z
      .string()
      .min(1, {
        message: '必須項目です',
      })
      .max(30, {
        message: '30文字以内で入力してください',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const url = 'http://localhost:3000/api/v1/auth';
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      email: values.email,
      password: values.password,
      confirm_success_url: 'http://localhost:8000/sign_in',
    };
    const res: AxiosResponse = await axios({
      method: 'POST',
      url,
      data,
      headers,
    });

    localStorage.setItem('access-token', res.headers['access-token'] || '');
    localStorage.setItem('client', res.headers['client'] || '');
    localStorage.setItem('uid', res.headers['uid'] || '');

    setLoading(false);
    router.push('/problems');
  }

  return (
    <>
      <Head>
        <title>サインアップ</title>
        <meta
          name="description"
          content="英語学習アプリblanky サインアップ画面"
        ></meta>
      </Head>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="メールアドレス" {...field} />
                </FormControl>
                <FormDescription>
                  メールアドレスを入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="パスワード" {...field} />
                </FormControl>
                <FormDescription>パスワードを入力してください</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">送信する</Button>
          )}
        </form>
      </Form>
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SignUpPage;
