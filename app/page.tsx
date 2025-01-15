"use client";

import { useState } from "react";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import { Todo } from "@/types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onComplete={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
