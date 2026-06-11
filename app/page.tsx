"use client";

import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { MoodSelector, type Mood } from "@/app/components/mood-selector";
import { JournalEntry } from "@/app/components/journal-entry";
import { TodoList, type Todo, type Priority } from "@/app/components/todo-list";
import { DailyQuote } from "@/app/components/daily-quote";
import { DateDisplay } from "@/app/components/date-display";
import { ThemeToggle } from "@/app/components/theme-toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function MindSpace() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [mounted, setMounted] = useState(false);

  const saveToBackend = async (updatedData: {
    mood?: Mood | null;
    journal?: string;
    todos?: Todo[];
    date?: string;
  }) => {
    try {
      console.log("backend ru ilgej bui data:", updatedData);
      const res = await fetch("/api/mindspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      console.log("backend-s irj bui data:", res.status);
    } catch (err) {
      console.error("didn't save to backend:", err);
    }
  };

  useEffect(() => {
    setMounted(true);

    const initFetch = async () => {
      try {
        console.log("backend huuchin data");
        const res = await fetch("/api/mindspace");
        if (res.ok) {
          const serverData = await res.json();

          console.log("backendes irsen dataaaaa:", serverData);
          const today = new Date().toDateString();

          // shine odor ehelsnig shalgah
          if (serverData.date && serverData.date !== today) {
            setSelectedMood(null);
            setJournalEntry("");
            setTodos(serverData.todos || []);
            saveToBackend({ mood: null, journal: "", date: today });
          } else {
            if (serverData.mood) setSelectedMood(serverData.mood as Mood);
            if (serverData.journal) setJournalEntry(serverData.journal);
            if (serverData.todos) setTodos(serverData.todos);

            //  server der ognoo bhgu bol onoodrinhor hadgalna
            if (!serverData.date) {
              saveToBackend({ date: today });
            }
          }
        }
      } catch (err) {
        console.error("Backend-ээс дата авч чадсангүй:", err);
      }
    };

    initFetch();

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    saveToBackend({ mood });
  };

  const handleJournalSave = () => {
    saveToBackend({ journal: journalEntry });
  };

  const handleAddTodo = (text: string, priority: Priority) => {
    const newTodos = [
      ...todos,
      { id: crypto.randomUUID(), text, completed: false, priority },
    ];
    setTodos(newTodos);
    saveToBackend({ todos: newTodos });
  };

  const handleToggleTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(newTodos);
    saveToBackend({ todos: newTodos });
  };

  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveToBackend({ todos: newTodos });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold text-foreground">
            MindSpace
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">MindSpace</h1>
          </div>
          <div className="flex items-center gap-4">
            <DateDisplay />
            <ThemeToggle />
          </div>
        </header>

        <section className="mb-8">
          <DailyQuote />
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How are you feeling today?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MoodSelector
                  selectedMood={selectedMood}
                  onMoodSelect={handleMoodSelect}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <JournalEntry
                  entry={journalEntry}
                  onEntryChange={setJournalEntry}
                  onSave={handleJournalSave}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Today&apos;s Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoList
                todos={todos}
                onAddTodo={handleAddTodo}
                onToggleTodo={handleToggleTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Take care of your mind. One day at a time.</p>
        </footer>
      </div>
    </div>
  );
}
