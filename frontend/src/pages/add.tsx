import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ProblemAddPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const formSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: '必須項目です',
      })
      .max(30, {
        message: '30文字以内で入力してください',
      }),
    englishText: z.string().min(1, {
      message: '必須項目です',
    }),
    blankTypeId: z
      .string()
      .min(1, {
        message: '必須項目です',
      })
      .transform((item) => Number(item)),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const countWords = (englishText: string): number => {
    return englishText.split(' ').filter((word) => word !== '').length;
  };

  const createBlankIndexes = (
    textLength: number,
    blank_rate: number,
  ): number[] => {
    const blankIndexes: number[] = [];
    for (let i = 0; i < textLength; i++) {
      if (Math.random() * 100 <= blank_rate) {
        blankIndexes.push(i);
      }
    }
    return blankIndexes;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const url = 'http://localhost:3000/api/v1/problems';
    const headers = { 'Content-Type': 'application/json' };
    const textLength = countWords(values.englishText);
    const blankIndexes = createBlankIndexes(textLength, 20);
    const data = {
      title: values.title,
      english_text: values.englishText,
      correct_answer_rate: 0,
      blank_type: values.blankTypeId,
      blank_rate: 30,
      blank_indices: blankIndexes,
    };
    await axios({ method: 'POST', url, data, headers });

    setLoading(false);
    router.push('/problems');
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
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="問題形式を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">ランダム</SelectItem>
                      <SelectItem value="2">名詞</SelectItem>
                      <SelectItem value="3">動詞</SelectItem>
                      <SelectItem value="4">形容詞</SelectItem>
                      <SelectItem value="5">副詞</SelectItem>
                      <SelectItem value="6">前置詞</SelectItem>
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
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">作成する</Button>
          )}
        </form>
      </Form>
    </>
  );
};

ProblemAddPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProblemAddPage;
