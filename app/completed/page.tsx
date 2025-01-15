"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/types";

export default function CompletedTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/");
      const todos: Todo[] = await response.json();
      setTodos(todos.filter((todo) => todo.completed));
    };
    fetchTodos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Completed Todos</h1>
      {todos.length === 0 ? (
        <p>No completed todos available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2">
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
