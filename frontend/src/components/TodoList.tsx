import { Todo } from '@/types';

type TodoListProps = {
  todoList: Todo[];
  changeCompleted: (id: number) => void;
};

const TodoList = ({ todoList, changeCompleted }: TodoListProps) => {
  return (
    <div className="space-y-3">
      {todoList.map((todo) => (
        <div key={todo.id} className="rounded bg-white p-2">
          <label className="flex gap-3 hover:cursor-pointer">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="size-5"
                checked={todo.completed}
                onChange={() => changeCompleted(todo.id)}
              />
            </div>
            <span
              className={todo.completed ? 'text-gray-400 line-through' : ''}
            >
              {todo.title}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
