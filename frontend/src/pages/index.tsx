import type { NextPage } from 'next';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import Layout from '@/components/layout';
import TodoSummary from '@/components/TodoSummary';
import useTodoList from '@/hooks/useTodoList';

const IndexPage: NextPage = () => {
  const { todoList, changeCompleted, addTodo, deleteTodo, deleteAllCompleted } =
    useTodoList();

  return (
    <Layout>
      <div className="mx-auto mt-10 max-w-xl space-y-10">
        <h1 className="text-center text-4xl">todoアプリ</h1>
        <div className="space-y-5">
          <AddTodoForm addTodo={addTodo} />
          <div className="rounded bg-slate-200 p-5 space-y-5">
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
  );
};

export default IndexPage;
