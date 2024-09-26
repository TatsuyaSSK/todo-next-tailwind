import type { NextPage } from 'next';
import TodoList from '@/components/TodoList';
import Layout from '@/components/layout';
import dummyTodoList from '@/data/dummyTodoList';

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-center text-4xl">todoアプリ</h1>
      <div className="rounded bg-slate-200 p-5">
        <TodoList todoList={dummyTodoList} />
      </div>
    </Layout>
  );
};

export default IndexPage;
