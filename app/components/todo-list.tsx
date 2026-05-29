"use client";

import { useState } from "react";
import { Plus, Check, Trash2, Circle, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";

type Priority = "low" | "medium" | "high";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
}

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (text: string, priority: Priority) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  low: "text-mood-calm",
  medium: "text-mood-energetic",
  high: "text-mood-stressed",
};

export function TodoList({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim(), priority);
      setNewTodo("");
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {completedCount} of {todos.length} completed
        </span>
        {todos.length > 0 && (
          <div className="h-2 w-40 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(completedCount / todos.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 ">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background text-foreground placeholder:text-muted-foreground"
        />
        {/* <div className="flex gap-1">
          {(["low", "medium", "high"] as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={cn(
                "p-3 rounded-xl border transition-all",
                priority === p
                  ? "bg-secondary border-primary"
                  : "border-border hover:bg-secondary",
              )}
              title={`${p} priority`}
            >
              <Flag className={cn("h-4 w-4", priorityColors[p])} />
            </button>
          ))}
        </div> */}
        <Button type="submit" size="icon" className="h-12 w-12 rounded-xl">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add a new task</span>
        </Button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border border-border bg-card transition-all duration-300",
              todo.completed && "opacity-60",
            )}
          >
            <button
              onClick={() => onToggleTodo(todo.id)}
              className={cn(
                "flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                todo.completed
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-border hover:border-primary",
              )}
            >
              {todo.completed && <Check className="h-4 w-4" />}
            </button>
            <span
              className={cn(
                "flex-1 transition-all",
                todo.completed && "line-through text-muted-foreground",
              )}
            >
              {todo.text}
            </span>
            {/* <Flag className={cn("h-4 w-4", priorityColors[todo.priority])} /> */}
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="text-center py-8 text-muted-foreground">
            <Circle className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No tasks yet. Add one to get started!</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export type { Todo, Priority };
