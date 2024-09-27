import type { NextPage } from 'next';
import Head from 'next/head';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import TodoSummary from '@/components/TodoSummary';
import Layout from '@/components/layout';
import useTodoList from '@/hooks/useTodoList';

const IndexPage: NextPage = () => {
  const { todoList, changeCompleted, addTodo, deleteTodo, deleteAllCompleted } =
    useTodoList();

  return (
    <>
      <Head>
        <title>todo</title>
        <meta name="keywords" content="todo"></meta>
        <meta name="description" content="Todoアプリの管理用です"></meta>
      </Head>
      <Layout>
        <div className="mx-auto mt-10 max-w-xl space-y-10">
          <h1 className="text-center text-4xl">todoアプリ</h1>
          <div className="space-y-5">
            <AddTodoForm addTodo={addTodo} />
            <div className="space-y-5 rounded bg-slate-200 p-5">
              <TodoList
                todoList={todoList}
                changeCompleted={changeCompleted}
                deleteTodo={deleteTodo}
              />
              <TodoSummary deleteAllCompleted={deleteAllCompleted} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
