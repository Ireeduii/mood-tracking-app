"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JournalEntryProps {
  entry: string
  onEntryChange: (entry: string) => void
  onSave: () => void
}

export function JournalEntry({ entry, onEntryChange, onSave }: JournalEntryProps) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    onSave()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm">What&apos;s on your mind today?</span>
      </div>
      <textarea
        value={entry}
        onChange={(e) => onEntryChange(e.target.value)}
        placeholder="Take a moment to reflect on your day..."
        className="w-full h-32 p-4 rounded-xl bg-input border border-border resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background text-foreground placeholder:text-muted-foreground leading-relaxed"
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={!entry.trim()}
          className="transition-all duration-300"
        >
          {isSaved ? "Saved!" : "Save Reflection"}
        </Button>
      </div>
    </div>
  )
}
