import type { NextPage } from 'next';
import { useState } from 'react';
import AddTodoForm from '@/components/AddTodoForm';
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

  const addTodo = (title: string) => {
    setTodoList((prevTodoList) => {
      const lastId = prevTodoList.at(-1)?.id ?? 0;
      const newTodo = {
        id: lastId + 1,
        title,
        completed: false,
      };
      return [...prevTodoList, newTodo];
    });
  };

  return (
    <Layout>
      <div className="mx-auto mt-10 max-w-xl space-y-10">
        <h1 className="text-center text-4xl">todoアプリ</h1>
        <div className="space-y-5">
          <AddTodoForm addTodo={addTodo} />
          <div className="rounded bg-slate-200 p-5">
            <TodoList todoList={todoList} changeCompleted={changeCompleted} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
