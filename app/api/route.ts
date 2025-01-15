import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/types";

let todos: Todo[] = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build a Todo App", completed: false },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const newTodo: Todo = { id: Date.now(), title, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  todos = todos.filter((todo) => todo.id !== Number(id));
  return new NextResponse(null, { status: 204 });
}

export async function PUT(req: NextRequest) {
  const { id, title, completed } = await req.json();
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  if (title) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  return NextResponse.json(todo);
}
