import { Todo } from '@/types';

type TodoListProps = {
  todoList: Todo[];
};

const TodoList = ({ todoList }: TodoListProps) => {
  return (
    <div className="space-y-3">
      {todoList.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
};

export default TodoList;
