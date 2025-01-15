import { Todo } from "@/types";
import Button from "./Button";

interface TodoItemProps {
  todo: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoItem = ({ todo, onComplete, onDelete }: TodoItemProps) => {
  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <h3 className={todo.completed ? "line-through text-gray-500" : ""}>
        {todo.title}
      </h3>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onComplete}>
          Complete
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
