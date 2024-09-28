import Head from 'next/head';
import { ReactElement, SyntheticEvent } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const problemAddPage: NextPageWithLayout = () => {
  const formSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: '必須項目です',
      })
      .max(40, {
        message: '40文字以内で入力してください',
      }),
    englishText: z.string().min(1, {
      message: '必須項目です',
    }),
    blankTypeId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Head>
        <title>問題追加</title>
        <meta
          name="description"
          content="英語学習アプリblanky 問題追加画面"
        ></meta>
      </Head>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="タイトル" {...field} />
                </FormControl>
                <FormDescription>
                  作成する問題のタイトルを入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="englishText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>英文</FormLabel>
                <FormControl>
                  <Textarea placeholder="英文" {...field} />
                </FormControl>
                <FormDescription>
                  穴埋め問題に使いたい英文を入力してください。単語は空白区切りで判定されます
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blankTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>問題形式</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>ランダム</SelectLabel>
                        <SelectItem value="random20">20%</SelectItem>
                        <SelectItem value="random50">50%</SelectItem>
                        <SelectItem value="random80">80%</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>特定の品詞</SelectLabel>
                        <SelectItem value="名詞">名詞</SelectItem>
                        <SelectItem value="動詞">動詞</SelectItem>
                        <SelectItem value="形容詞">形容詞</SelectItem>
                        <SelectItem value="副詞">副詞</SelectItem>
                        <SelectItem value="前置詞">前置詞</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  ランダムに穴埋めするか、特定の品詞を穴埋めにするか選択してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

problemAddPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default problemAddPage;
