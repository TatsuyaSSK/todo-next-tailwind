import { Todo } from '@/types';

type TodoListProps = {
  todoList: Todo[];
  changeCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoList = ({ todoList, changeCompleted, deleteTodo }: TodoListProps) => {
  return (
    <div className="space-y-3">
      {todoList.map((todo) => (
        <div key={todo.id} className="flex rounded bg-white p-2">
          <label className="grow flex items-center gap-3 hover:cursor-pointer">
            <input
              type="checkbox"
              className="size-5"
              checked={todo.completed}
              onChange={() => changeCompleted(todo.id)}
            />
            <span
              className={todo.completed ? 'text-gray-400 line-through' : ''}
            >
              {todo.title}
            </span>
          </label>
          <button
            className="rounded bg-gray-200 p-2"
            onClick={() => deleteTodo(todo.id)}
          >
            削除
          </button>
        </div>
      ))}
      {todoList.length === 0 && (
        <p className="text-center text-lg">Todoがありません</p>
      )}
    </div>
  );
};

export default TodoList;
