"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import { Todo } from "@/types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/");
        if (!response.ok) throw new Error("Failed to fetch todos");
        const todos: Todo[] = await response.json();
        setTodos(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      const newTodo: Todo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
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
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onComplete={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
