import { useEffect, useState } from 'react';
import dummyTodoList from '@/data/dummyTodoList';

const useTodoList = () => {
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

  const deleteTodo = (id: number) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => todo.id !== id);
    });
  };

  const deleteAllCompleted = () => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => !todo.completed);
    });
  };

  return {
    todoList,
    changeCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompleted,
  };
};

export default useTodoList;
