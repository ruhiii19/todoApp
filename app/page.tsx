"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import { Todo } from "@/types";
import Link from "next/link";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from backend
  useEffect(() => {
    setLoading(true);
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const todos: Todo[] = await response.json();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    setError(null);
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      const newTodo: Todo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error: any) {
      console.error("Error adding todo:", error);
      setError(error.message);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      const response = await fetch("/api/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !todo.completed }),
      });
      if (!response.ok) throw new Error("Failed to toggle todo");
      const updatedTodo: Todo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <nav className="mb-4">
        <Link href="/" className="mr-4 text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/completed" className="text-blue-500 hover:underline">
          Completed Todos
        </Link>
      </nav>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onComplete={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
