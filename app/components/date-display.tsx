"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

export function DateDisplay() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());

    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (!date) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="h-12 w-12 rounded-xl bg-secondary" />
        <div className="space-y-2">
          <div className="h-4 w-20 bg-secondary rounded" />
          <div className="h-6 w-32 bg-secondary rounded" />
        </div>
      </div>
    );
  }

  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const year = date.getFullYear();

  return (
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-primary">
        <CalendarDays className="h-6 w-6 text-primary" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{dayName}</p>
        <p className="text-xl font-semibold text-foreground">
          {monthDay}, {year}
        </p>
      </div>
    </div>
  );
}
