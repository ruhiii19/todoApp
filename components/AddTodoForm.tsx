import { useState } from "react";
import Button from "./Button";
interface AddTodoFormProps {
  onAddTodo: (title: string) => void;
}

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("please enter a todo");
      return;
    }
    onAddTodo(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gab-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
        className="flex-grow p-2 border border-gray-300 rounded-md text-black"
      />
      <Button type="submit" variant="primary">
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodoForm;
