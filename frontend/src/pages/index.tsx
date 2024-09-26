import type { NextPage } from 'next';
import { useState } from 'react';
import TodoList from '@/components/TodoList';
import Layout from '@/components/layout';
import dummyTodoList from '@/data/dummyTodoList';

const IndexPage: NextPage = () => {
  const [todoList, setTodoList] = useState(dummyTodoList);
  const changeCompleted = (id: number) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  };

  return (
    <Layout>
      <h1 className="text-center text-4xl">todoアプリ</h1>
      <div className="rounded bg-slate-200 p-5">
        <TodoList todoList={todoList} changeCompleted={changeCompleted} />
      </div>
    </Layout>
  );
};

export default IndexPage;
