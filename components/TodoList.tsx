import TodoItem from "./TodoItem";
import { Todo } from "@/types";

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onComplete, onDelete }: TodoListProps) => {
  if (todos.length == 0)
    return <p className="text-gray-500">No todos available. </p>;

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={() => onComplete(todo.id)} // Ensure correct usage
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
