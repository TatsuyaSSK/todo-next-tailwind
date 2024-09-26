import { useState } from 'react';

type AddTodoFormProps = {
  addTodo: (title: string) => void;
};

const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <form className="flex" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="新しいtodoを入力してください"
        className="grow rounded-s bg-slate-200 p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        disabled={!inputValue}
        className="rounded-e bg-blue-600 p-2 transition-colors hover:bg-blue-800 disabled:bg-gray-400"
      >
        <span className="text-white">追加</span>
      </button>
    </form>
  );
};

export default AddTodoForm;
